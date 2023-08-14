import { settings } from "../constants/settings";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnAuthorizedError,
} from "../handlers/responseHandlers";
import { paginate } from "../helpers/paginate";
import {
  ICreateListingRes,
  IGetListingsRes,
} from "../interfaces/response/listing.response";
import { IProperty } from "../interfaces/schema/property.schema";
import { CreateListingBody } from "../interfaces/services/listing.body";
import Property from "../models/property.model";
import agentService from "./agent.service";

const createListing = async (
  body: CreateListingBody
): Promise<ICreateListingRes> => {
  const listing = await Property.create({
    title: body.title,
    description: body.description,
    type: body.type,
    status: body.status,
    price: body.price,
    location: {
      address: body.address,
      country: body.country,
      state: body.state,
      city: body.city,
      zipCode: body.zipCode,
    },
    info: {
      area: body?.area,
      areaSuffix: body?.areaSuffix,
      bedrooms: body?.bedrooms,
      bathrooms: body?.bathrooms,
      yearBuilt: body?.yearBuilt,
    },
    amenities: body?.amenities,
    images: body?.images,
    owner: body?.owner,
  });

  return {
    message: "Property listing created successully",
    property: listing,
  };
};

const getListings = async (
  query: Object,
  page: string,
  hits: string
): Promise<IGetListingsRes> => {
  let listing = Property.find(query)
    .populate(settings.mongo.collections.agent)
    .populate(settings.mongo.collections.user);

  const {
    result,
    page: xpage,
    hitsPerPage,
  } = await paginate(page, hits, listing);

  return { properties: result, page: xpage, hitsPerPage };
};

const getSingleListing = async (
  viewer: string,
  id: string
): Promise<IProperty> => {
  const property = await Property.findById(id)
    .populate("owner")
    .populate(settings.mongo.collections.agent)
    .populate(settings.mongo.collections.agent);

  if (!property) {
    throw new NotFoundError("Property does not exists");
  }

  property.views += 1;
  await property.save();

  return property;
};

const updateListing = async (
  owner: string,
  _id: string,
  body: CreateListingBody
): Promise<IProperty> => {
  const property = await Property.findOneAndUpdate(
    { _id, owner },
    {
      title: body.title,
      description: body.description,
      type: body.type,
      status: body.status,
      price: body.price,
      location: {
        address: body.address,
        country: body.country,
        state: body.state,
        city: body.city,
        zipCode: body.zipCode,
      },
      info: {
        area: body?.area,
        areaSuffix: body?.areaSuffix,
        bedrooms: body?.bedrooms,
        bathrooms: body?.bathrooms,
        yearBuilt: body?.yearBuilt,
      },
      amenities: body?.amenities,
      images: body?.images,
    },
    { new: true, runValidators: true }
  );

  if (!property) {
    throw new NotFoundError(
      "Property does not exist or does not belong to you"
    );
  }

  return property;
};

const deleteListing = async (owner: string, _id: string): Promise<void> => {
  const listing = await Property.findOneAndDelete({ _id, owner });
  if (!listing) {
    throw new NotFoundError(
      "Property does not exist or does not belong to you"
    );
  }
};

const compareProperties = async (ids: string[]): Promise<any> => {
  if (ids?.length < 2) {
    throw new BadRequestError("Provide more than one property for comparison");
  }

  const query = ids?.map((id) => ({ _id: id }));

  const listings = await Property.find({ $or: query });

  if (!listings || listings?.length < 2) {
    throw new NotFoundError("Some properties do not exist");
  }

  const keys: string[] = [];

  Object.keys(listings[0].toObject()).forEach((key) => keys.push(key));

  const comparison: any = {};

  // intialize comparison
  keys.forEach((key) => (comparison[key] = []));

  listings.forEach((listing) => {
    keys.forEach((key: string) => {
      comparison[key].push(listing?.[key as keyof typeof listing]);
    });
  });

  return comparison;
};

const sellMyProperty = async (
  id: string,
  owner: string
): Promise<IProperty> => {
  const agent = await agentService.getProfile(owner as string);

  if (!agent) {
    throw new UnAuthorizedError("Only agents can put up properties for sale");
  }

  const property = await Property.findOne({ _id: id, owner: owner });

  if (!property) {
    throw new NotFoundError(
      "This property does not exist or does not belong to you"
    );
  }

  if (property.isAvailable) {
    throw new ForbiddenError("Property is already available for sale");
  }

  property.owner = agent._id;
  property.isAvailable = true;

  const result = await property.save();

  return result;
};

// properties that are not for sale
const getMyProperties = async (userId: string): Promise<IProperty[]> => {
  const properties = await Property.find({
    owner: userId,
    isAvailable: false,
  }).populate("owner");

  if (!properties || properties.length === 0) {
    throw new NotFoundError("You do not own any property");
  }

  return properties;
};

const listingService = {
  createListing,
  getListings,
  getSingleListing,
  updateListing,
  deleteListing,
  compareProperties,
  sellMyProperty,
  getMyProperties,
};

export default listingService;
