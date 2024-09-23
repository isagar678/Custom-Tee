declare const GetApiUserDataUserGet: {
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly title: "Id";
                };
                readonly email: {
                    readonly type: "string";
                    readonly title: "Email";
                };
                readonly balance: {
                    readonly type: "number";
                    readonly title: "Balance";
                };
            };
            readonly type: "object";
            readonly required: readonly ["id", "email", "balance"];
            readonly title: "User";
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetCreationCreationsCreationIdGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly creation_id: {
                    readonly type: "integer";
                    readonly title: "Creation Id";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
            };
            readonly required: readonly ["creation_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly title: "Id";
                };
                readonly status: {
                    readonly type: "string";
                    readonly enum: readonly ["submitted", "in progress", "completed", "failed"];
                    readonly title: "Status";
                    readonly description: "`submitted` `in progress` `completed` `failed`";
                };
                readonly prompt: {
                    readonly type: "string";
                    readonly title: "Prompt";
                };
                readonly negativePrompt: {
                    readonly type: "string";
                    readonly title: "Negativeprompt";
                };
                readonly width: {
                    readonly type: "integer";
                    readonly title: "Width";
                };
                readonly height: {
                    readonly type: "integer";
                    readonly title: "Height";
                };
                readonly highResolution: {
                    readonly type: "boolean";
                    readonly title: "Highresolution";
                };
                readonly seed: {
                    readonly type: "integer";
                    readonly title: "Seed";
                };
                readonly steps: {
                    readonly type: "integer";
                    readonly title: "Steps";
                };
                readonly model: {
                    readonly type: "string";
                    readonly enum: readonly ["lyra", "hydra", "fantasy", "portrait", "inpunk", "abstractWorld", "anime", "argo", "cinematic", "photography", "scifi", "detailedIllustration", "3dIllustration", "flatIllustration", "realvisxl", "stylevisionxl", "animaginexl", "anime_2", "anime_stylized", "anime_vintage", "pixelart"];
                    readonly title: "Model";
                    readonly description: "creation's model or style\n\n`lyra` `hydra` `fantasy` `portrait` `inpunk` `abstractWorld` `anime` `argo` `cinematic` `photography` `scifi` `detailedIllustration` `3dIllustration` `flatIllustration` `realvisxl` `stylevisionxl` `animaginexl` `anime_2` `anime_stylized` `anime_vintage` `pixelart`";
                };
                readonly initialImage: {
                    readonly type: "string";
                    readonly title: "Initialimage";
                    readonly description: "URL of the used initial image (if any)";
                };
                readonly initialImageMode: {
                    readonly type: "string";
                    readonly enum: readonly ["color", "structure", "depth", "scribble"];
                    readonly title: "Initialimagemode";
                    readonly description: "Only available with initial images\n\n`color` `structure` `depth` `scribble`";
                };
                readonly initialImageStrength: {
                    readonly type: "integer";
                    readonly title: "Initialimagestrength";
                    readonly description: "Only available with initial images";
                };
                readonly createdAt: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly title: "Createdat";
                };
                readonly updatedAt: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly title: "Updatedat";
                };
                readonly images: {
                    readonly items: {
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly title: "Id";
                            };
                            readonly url: {
                                readonly type: "string";
                                readonly title: "Url";
                            };
                        };
                        readonly type: "object";
                        readonly title: "Variation";
                    };
                    readonly type: "array";
                    readonly title: "Images";
                    readonly description: "`null` if expired (24 hours after creation)";
                };
                readonly expired: {
                    readonly type: "boolean";
                    readonly title: "Expired";
                    readonly description: "Creation is expired if it's been more than 24 hours since it was created, images will be deleted after 24 hours";
                };
            };
            readonly type: "object";
            readonly required: readonly ["id", "status", "prompt", "width", "height", "highResolution", "seed", "steps", "model", "createdAt", "updatedAt", "images", "expired"];
            readonly title: "Creation";
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "422": {
            readonly properties: {
                readonly detail: {
                    readonly items: {
                        readonly properties: {
                            readonly loc: {
                                readonly items: {
                                    readonly anyOf: readonly [{
                                        readonly type: "string";
                                    }, {
                                        readonly type: "integer";
                                    }];
                                };
                                readonly type: "array";
                                readonly title: "Location";
                            };
                            readonly msg: {
                                readonly type: "string";
                                readonly title: "Message";
                            };
                            readonly type: {
                                readonly type: "string";
                                readonly title: "Error Type";
                            };
                        };
                        readonly type: "object";
                        readonly required: readonly ["loc", "msg", "type"];
                        readonly title: "ValidationError";
                    };
                    readonly type: "array";
                    readonly title: "Detail";
                };
            };
            readonly type: "object";
            readonly title: "HTTPValidationError";
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetCreationsCreationsGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly cursor: {
                    readonly type: "integer";
                    readonly title: "Cursor";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly title: "Limit";
                    readonly default: 50;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly title: "Offset";
                    readonly default: 0;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly items: {
                readonly properties: {
                    readonly id: {
                        readonly type: "integer";
                        readonly title: "Id";
                    };
                    readonly status: {
                        readonly type: "string";
                        readonly enum: readonly ["submitted", "in progress", "completed", "failed"];
                        readonly title: "Status";
                        readonly description: "`submitted` `in progress` `completed` `failed`";
                    };
                    readonly prompt: {
                        readonly type: "string";
                        readonly title: "Prompt";
                    };
                    readonly negativePrompt: {
                        readonly type: "string";
                        readonly title: "Negativeprompt";
                    };
                    readonly width: {
                        readonly type: "integer";
                        readonly title: "Width";
                    };
                    readonly height: {
                        readonly type: "integer";
                        readonly title: "Height";
                    };
                    readonly highResolution: {
                        readonly type: "boolean";
                        readonly title: "Highresolution";
                    };
                    readonly seed: {
                        readonly type: "integer";
                        readonly title: "Seed";
                    };
                    readonly steps: {
                        readonly type: "integer";
                        readonly title: "Steps";
                    };
                    readonly model: {
                        readonly type: "string";
                        readonly enum: readonly ["lyra", "hydra", "fantasy", "portrait", "inpunk", "abstractWorld", "anime", "argo", "cinematic", "photography", "scifi", "detailedIllustration", "3dIllustration", "flatIllustration", "realvisxl", "stylevisionxl", "animaginexl", "anime_2", "anime_stylized", "anime_vintage", "pixelart"];
                        readonly title: "Model";
                        readonly description: "creation's model or style\n\n`lyra` `hydra` `fantasy` `portrait` `inpunk` `abstractWorld` `anime` `argo` `cinematic` `photography` `scifi` `detailedIllustration` `3dIllustration` `flatIllustration` `realvisxl` `stylevisionxl` `animaginexl` `anime_2` `anime_stylized` `anime_vintage` `pixelart`";
                    };
                    readonly initialImage: {
                        readonly type: "string";
                        readonly title: "Initialimage";
                        readonly description: "URL of the used initial image (if any)";
                    };
                    readonly initialImageMode: {
                        readonly type: "string";
                        readonly enum: readonly ["color", "structure", "depth", "scribble"];
                        readonly title: "Initialimagemode";
                        readonly description: "Only available with initial images\n\n`color` `structure` `depth` `scribble`";
                    };
                    readonly initialImageStrength: {
                        readonly type: "integer";
                        readonly title: "Initialimagestrength";
                        readonly description: "Only available with initial images";
                    };
                    readonly createdAt: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly title: "Createdat";
                    };
                    readonly updatedAt: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly title: "Updatedat";
                    };
                    readonly images: {
                        readonly items: {
                            readonly properties: {
                                readonly id: {
                                    readonly type: "integer";
                                    readonly title: "Id";
                                };
                                readonly url: {
                                    readonly type: "string";
                                    readonly title: "Url";
                                };
                            };
                            readonly type: "object";
                            readonly title: "Variation";
                        };
                        readonly type: "array";
                        readonly title: "Images";
                        readonly description: "`null` if expired (24 hours after creation)";
                    };
                    readonly expired: {
                        readonly type: "boolean";
                        readonly title: "Expired";
                        readonly description: "Creation is expired if it's been more than 24 hours since it was created, images will be deleted after 24 hours";
                    };
                };
                readonly type: "object";
                readonly required: readonly ["id", "status", "prompt", "width", "height", "highResolution", "seed", "steps", "model", "createdAt", "updatedAt", "images", "expired"];
                readonly title: "Creation";
            };
            readonly type: "array";
            readonly title: "Response Get Creations Creations  Get";
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "422": {
            readonly properties: {
                readonly detail: {
                    readonly items: {
                        readonly properties: {
                            readonly loc: {
                                readonly items: {
                                    readonly anyOf: readonly [{
                                        readonly type: "string";
                                    }, {
                                        readonly type: "integer";
                                    }];
                                };
                                readonly type: "array";
                                readonly title: "Location";
                            };
                            readonly msg: {
                                readonly type: "string";
                                readonly title: "Message";
                            };
                            readonly type: {
                                readonly type: "string";
                                readonly title: "Error Type";
                            };
                        };
                        readonly type: "object";
                        readonly required: readonly ["loc", "msg", "type"];
                        readonly title: "ValidationError";
                    };
                    readonly type: "array";
                    readonly title: "Detail";
                };
            };
            readonly type: "object";
            readonly title: "HTTPValidationError";
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const NewCreationCreationsPost: {
    readonly body: {
        readonly properties: {
            readonly prompt: {
                readonly type: "string";
                readonly maxLength: 765;
                readonly minLength: 3;
                readonly title: "Prompt";
                readonly description: "image(s) description";
            };
            readonly negativePrompt: {
                readonly type: "string";
                readonly maxLength: 765;
                readonly title: "Negativeprompt";
                readonly description: "content to avoid/remove from the image(s)";
            };
            readonly model: {
                readonly type: "string";
                readonly enum: readonly ["lyra", "hydra", "fantasy", "portrait", "inpunk", "abstractWorld", "anime", "argo", "cinematic", "photography", "scifi", "detailedIllustration", "3dIllustration", "flatIllustration", "realvisxl", "stylevisionxl", "animaginexl", "anime_2", "anime_stylized", "anime_vintage", "pixelart"];
                readonly title: "Model";
                readonly description: "creation's model or style\n\nDefault: `lyra`";
                readonly default: "lyra";
            };
            readonly aspectRatio: {
                readonly type: "string";
                readonly enum: readonly ["square", "landscape", "smallPortrait", "portrait", "wide"];
                readonly title: "Aspectratio";
                readonly description: "image's aspect ratio: `square`: 1:1, `landscape`: 16:9, `smallPortrait`: 4:5, `portrait`: 9:16, `wide`: 21:9\n\nDefault: `square`";
                readonly default: "square";
            };
            readonly highResolution: {
                readonly type: "boolean";
                readonly title: "Highresolution";
                readonly description: "high resolution images have different dimensions and include more details, see pricing";
                readonly default: false;
            };
            readonly images: {
                readonly type: "integer";
                readonly maximum: 12;
                readonly minimum: 1;
                readonly title: "Images";
                readonly description: "Number of variations/images to generate, see pricing";
                readonly default: 4;
            };
            readonly seed: {
                readonly type: "integer";
                readonly title: "Seed";
                readonly description: "Random if not provided, seed value is deterministic, same seed will produce the same result";
            };
            readonly steps: {
                readonly type: "integer";
                readonly maximum: 150;
                readonly minimum: 1;
                readonly title: "Steps";
                readonly description: "The number of iterations/steps to run the model for. Higher iterations likely produce better results but take longer to run";
                readonly default: 20;
            };
            readonly initialImageUrl: {
                readonly type: "string";
                readonly title: "Initialimageurl";
                readonly description: "Public URL of an image to start with, max `10MB`, mutally exclusive with `initialImageEncoded`";
            };
            readonly initialImageEncoded: {
                readonly type: "string";
                readonly title: "Initialimageencoded";
                readonly description: "Base64 encoded image to start with, max `10MB`, mutally exclusive with `initialImageUrl`";
            };
            readonly initialImageMode: {
                readonly type: "string";
                readonly enum: readonly ["color", "structure", "depth", "scribble"];
                readonly title: "Initialimagemode";
                readonly description: "Ignored if `initialImageEncoded` or `initialImageUrl` is not provided, `color` preserves the color of the initial image, `structure` preserves the structure of the initial image, `depth` preserves the depth of the initial image, `scribble` preserves the structure of the initial image but with a more abstract look\n\nDefault: `color`";
                readonly default: "color";
            };
            readonly initialImageStrength: {
                readonly type: "integer";
                readonly maximum: 100;
                readonly minimum: 0;
                readonly title: "Initialimagestrength";
                readonly description: "How much the initial image influences the result, `0` ignores the initial image, `100` produces a result that is very similar to the initial image";
            };
        };
        readonly type: "object";
        readonly required: readonly ["prompt"];
        readonly title: "NewCreation";
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly title: "Id";
                };
                readonly status: {
                    readonly type: "string";
                    readonly enum: readonly ["submitted", "in progress", "completed", "failed"];
                    readonly title: "Status";
                    readonly description: "`submitted` `in progress` `completed` `failed`";
                };
                readonly prompt: {
                    readonly type: "string";
                    readonly title: "Prompt";
                };
                readonly negativePrompt: {
                    readonly type: "string";
                    readonly title: "Negativeprompt";
                };
                readonly width: {
                    readonly type: "integer";
                    readonly title: "Width";
                };
                readonly height: {
                    readonly type: "integer";
                    readonly title: "Height";
                };
                readonly highResolution: {
                    readonly type: "boolean";
                    readonly title: "Highresolution";
                };
                readonly seed: {
                    readonly type: "integer";
                    readonly title: "Seed";
                };
                readonly steps: {
                    readonly type: "integer";
                    readonly title: "Steps";
                };
                readonly model: {
                    readonly type: "string";
                    readonly enum: readonly ["lyra", "hydra", "fantasy", "portrait", "inpunk", "abstractWorld", "anime", "argo", "cinematic", "photography", "scifi", "detailedIllustration", "3dIllustration", "flatIllustration", "realvisxl", "stylevisionxl", "animaginexl", "anime_2", "anime_stylized", "anime_vintage", "pixelart"];
                    readonly title: "Model";
                    readonly description: "creation's model or style\n\n`lyra` `hydra` `fantasy` `portrait` `inpunk` `abstractWorld` `anime` `argo` `cinematic` `photography` `scifi` `detailedIllustration` `3dIllustration` `flatIllustration` `realvisxl` `stylevisionxl` `animaginexl` `anime_2` `anime_stylized` `anime_vintage` `pixelart`";
                };
                readonly initialImage: {
                    readonly type: "string";
                    readonly title: "Initialimage";
                    readonly description: "URL of the used initial image (if any)";
                };
                readonly initialImageMode: {
                    readonly type: "string";
                    readonly enum: readonly ["color", "structure", "depth", "scribble"];
                    readonly title: "Initialimagemode";
                    readonly description: "Only available with initial images\n\n`color` `structure` `depth` `scribble`";
                };
                readonly initialImageStrength: {
                    readonly type: "integer";
                    readonly title: "Initialimagestrength";
                    readonly description: "Only available with initial images";
                };
                readonly createdAt: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly title: "Createdat";
                };
                readonly updatedAt: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly title: "Updatedat";
                };
                readonly images: {
                    readonly items: {
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly title: "Id";
                            };
                            readonly url: {
                                readonly type: "string";
                                readonly title: "Url";
                            };
                        };
                        readonly type: "object";
                        readonly title: "Variation";
                    };
                    readonly type: "array";
                    readonly title: "Images";
                    readonly description: "`null` if expired (24 hours after creation)";
                };
                readonly expired: {
                    readonly type: "boolean";
                    readonly title: "Expired";
                    readonly description: "Creation is expired if it's been more than 24 hours since it was created, images will be deleted after 24 hours";
                };
            };
            readonly type: "object";
            readonly required: readonly ["id", "status", "prompt", "width", "height", "highResolution", "seed", "steps", "model", "createdAt", "updatedAt", "images", "expired"];
            readonly title: "Creation";
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "422": {
            readonly properties: {
                readonly detail: {
                    readonly items: {
                        readonly properties: {
                            readonly loc: {
                                readonly items: {
                                    readonly anyOf: readonly [{
                                        readonly type: "string";
                                    }, {
                                        readonly type: "integer";
                                    }];
                                };
                                readonly type: "array";
                                readonly title: "Location";
                            };
                            readonly msg: {
                                readonly type: "string";
                                readonly title: "Message";
                            };
                            readonly type: {
                                readonly type: "string";
                                readonly title: "Error Type";
                            };
                        };
                        readonly type: "object";
                        readonly required: readonly ["loc", "msg", "type"];
                        readonly title: "ValidationError";
                    };
                    readonly type: "array";
                    readonly title: "Detail";
                };
            };
            readonly type: "object";
            readonly title: "HTTPValidationError";
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
export { GetApiUserDataUserGet, GetCreationCreationsCreationIdGet, GetCreationsCreationsGet, NewCreationCreationsPost };
