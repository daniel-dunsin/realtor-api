import { BadRequestError, NotFoundError } from "../handlers/responseHandlers";
import { paginate } from "../helpers/paginate";
import {
  ICreateListingRes,
  IGetListingsRes,
} from "../interfaces/response/listing.response";
import { IProperty } from "../interfaces/schema/property.schema";
import { CreateListingBody } from "../interfaces/services/listing.body";
import Property from "../models/property.model";

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
  let listing = Property.find(query).populate("owner");

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
  const property = await Property.findById(id).populate("owner");

  if (!property) {
    throw new NotFoundError("Property does not exists");
  }

  if (property.owner?._id.toString() !== viewer) {
    property.views += 1;
    await property.save();
  }

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
  console.log(keys);

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

const listingService = {
  createListing,
  getListings,
  getSingleListing,
  updateListing,
  deleteListing,
  compareProperties,
};

export default listingService;
