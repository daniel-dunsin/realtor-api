"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("../constants/settings");
const responseHandlers_1 = require("../handlers/responseHandlers");
const paginate_1 = require("../helpers/paginate");
const property_model_1 = __importDefault(require("../models/property.model"));
const agent_service_1 = __importDefault(require("./agent.service"));
const createListing = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield property_model_1.default.create({
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
            area: body === null || body === void 0 ? void 0 : body.area,
            areaSuffix: body === null || body === void 0 ? void 0 : body.areaSuffix,
            bedrooms: body === null || body === void 0 ? void 0 : body.bedrooms,
            bathrooms: body === null || body === void 0 ? void 0 : body.bathrooms,
            yearBuilt: body === null || body === void 0 ? void 0 : body.yearBuilt,
        },
        amenities: body === null || body === void 0 ? void 0 : body.amenities,
        images: body === null || body === void 0 ? void 0 : body.images,
        owner: body === null || body === void 0 ? void 0 : body.owner,
    });
    return {
        message: "Property listing created successully",
        property: listing,
    };
});
const getListings = (query, page, hits) => __awaiter(void 0, void 0, void 0, function* () {
    let listing = property_model_1.default.find(query)
        .populate(settings_1.settings.mongo.collections.agent)
        .populate(settings_1.settings.mongo.collections.user);
    const { result, page: xpage, hitsPerPage, } = yield (0, paginate_1.paginate)(page, hits, listing);
    return { properties: result, page: xpage, hitsPerPage };
});
const getSingleListing = (viewer, id) => __awaiter(void 0, void 0, void 0, function* () {
    const property = yield property_model_1.default.findById(id)
        .populate("owner")
        .populate(settings_1.settings.mongo.collections.agent)
        .populate(settings_1.settings.mongo.collections.agent);
    if (!property) {
        throw new responseHandlers_1.NotFoundError("Property does not exists");
    }
    property.views += 1;
    yield property.save();
    return property;
});
const updateListing = (owner, _id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const property = yield property_model_1.default.findOneAndUpdate({ _id, owner }, {
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
            area: body === null || body === void 0 ? void 0 : body.area,
            areaSuffix: body === null || body === void 0 ? void 0 : body.areaSuffix,
            bedrooms: body === null || body === void 0 ? void 0 : body.bedrooms,
            bathrooms: body === null || body === void 0 ? void 0 : body.bathrooms,
            yearBuilt: body === null || body === void 0 ? void 0 : body.yearBuilt,
        },
        amenities: body === null || body === void 0 ? void 0 : body.amenities,
        images: body === null || body === void 0 ? void 0 : body.images,
    }, { new: true, runValidators: true });
    if (!property) {
        throw new responseHandlers_1.NotFoundError("Property does not exist or does not belong to you");
    }
    return property;
});
const deleteListing = (owner, _id) => __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield property_model_1.default.findOneAndDelete({ _id, owner });
    if (!listing) {
        throw new responseHandlers_1.NotFoundError("Property does not exist or does not belong to you");
    }
});
const compareProperties = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    if ((ids === null || ids === void 0 ? void 0 : ids.length) < 2) {
        throw new responseHandlers_1.BadRequestError("Provide more than one property for comparison");
    }
    const query = ids === null || ids === void 0 ? void 0 : ids.map((id) => ({ _id: id }));
    const listings = yield property_model_1.default.find({ $or: query });
    if (!listings || (listings === null || listings === void 0 ? void 0 : listings.length) < 2) {
        throw new responseHandlers_1.NotFoundError("Some properties do not exist");
    }
    const keys = [];
    Object.keys(listings[0].toObject()).forEach((key) => keys.push(key));
    const comparison = {};
    // intialize comparison
    keys.forEach((key) => (comparison[key] = []));
    listings.forEach((listing) => {
        keys.forEach((key) => {
            comparison[key].push(listing === null || listing === void 0 ? void 0 : listing[key]);
        });
    });
    return comparison;
});
const sellMyProperty = (id, owner) => __awaiter(void 0, void 0, void 0, function* () {
    const agent = yield agent_service_1.default.getProfile(owner);
    if (!agent) {
        throw new responseHandlers_1.UnAuthorizedError("Only agents can put up properties for sale");
    }
    const property = yield property_model_1.default.findOne({ _id: id, owner: owner });
    if (!property) {
        throw new responseHandlers_1.NotFoundError("This property does not exist or does not belong to you");
    }
    if (property.isAvailable) {
        throw new responseHandlers_1.ForbiddenError("Property is already available for sale");
    }
    property.owner = agent._id;
    property.isAvailable = true;
    const result = yield property.save();
    return result;
});
// properties that are not for sale
const getMyProperties = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const properties = yield property_model_1.default.find({
        owner: userId,
        isAvailable: false,
    }).populate("owner");
    if (!properties || properties.length === 0) {
        throw new responseHandlers_1.NotFoundError("You do not own any property");
    }
    return properties;
});
const updatePropertyOwner = (property, buyer) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield property_model_1.default.findByIdAndUpdate(property, {
        isAvailable: false,
        owner: buyer,
    }, { new: true, runValidators: true });
    if (!response) {
        throw new responseHandlers_1.NotFoundError("Property does not exist");
    }
    return response;
});
const listingService = {
    createListing,
    getListings,
    getSingleListing,
    updateListing,
    deleteListing,
    compareProperties,
    sellMyProperty,
    getMyProperties,
    updatePropertyOwner,
};
exports.default = listingService;
