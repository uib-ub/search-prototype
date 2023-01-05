import Client from "@searchkit/api";

const client = Client({
  connection: {
    host: process.env.ES_HOST,
    apiKey: process.env.ES_APIKEY,
  },
  search_settings: {
    highlight_attributes: [
      "label_no",
      "label_en",
      "maker",
    ],
    search_attributes: [
      "label_no",
      "description_no",
      "maker.label_no",
      "subject.label_no",
      "spatial.label_no",
    ],
    result_attributes: [],
    facet_attributes: [
      { attribute: "maker.label_no", field: "label_no.keyword", nestedPath: "maker", type: "string" },
      { attribute: "subject.label_no", field: "label_no.keyword", nestedPath: "subject", type: "string" },
      { attribute: "spatial.label_no", field: "label_no.keyword", nestedPath: "spatial", type: "string" },
      { attribute: "created", field: "created", type: "date" },
      {
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
      },
    ],
  },
}, { debug: true });

export default async function handler(req, res) {
  const results = await client.handleRequest(req.body);
  res.send(results);
}