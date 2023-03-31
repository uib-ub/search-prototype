import Client from "@searchkit/api";
import { NextApiRequest, NextApiResponse } from "next";

const client = Client({
  connection: {
    host: process.env.ES_HOST!,
    apiKey: process.env.ES_APIKEY,
  },
  search_settings: {
    highlight_attributes: [
      "label_none",
      "description_none",
    ],
    search_attributes: [
      "objectID",
      "type",
      "identifier",
      "label",
      "label.no",
      "label.none",
      "label_none",
      "label_en",
      "description",
      "description.no",
      "description.en",
      "description_none",
      "description_en",
      "description_en",
      "maker.label_none",
      "subject.label_none",
      "spatial.label_none",
    ],
    result_attributes: [
      "objectID",
      "id",
      "identifier",
      "type",
      "label",
      "label_none",
      "homepage",
      "image",
      "subjectOfManifest",
      "description",
      "description_none",
      "maker",
      "subject",
      "spatial",
      "location",
      "available"
    ],
    facet_attributes: [
      { attribute: "type", field: "type", type: "string" },
      { attribute: "maker.label_none", field: "label_none", nestedPath: "maker", type: "string" },
      { attribute: "subject.label_none", field: "label_none", nestedPath: "subject", type: "string" },
      { attribute: "spatial.label_none", field: "label_none", nestedPath: "spatial", type: "string" },
      /* {
        attribute: 'hierarchicalPlaces.lvl0',
        field: 'hierarchicalPlaces.lvl0.keyword',
        type: 'string'
      },
      {
        attribute: 'hierarchicalPlaces.lvl1',
        field: 'hierarchicalPlaces.lvl1.keyword',
        type: 'string'
      },
      {
        attribute: 'hierarchicalPlaces.lvl2',
        field: 'hierarchicalPlaces.lvl2.keyword',
        type: 'string'
      }, */
    ],
    geo_attribute: "location",
  },
}, { debug: true });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const results = await client.handleRequest(req.body);
  res.send(results);
}