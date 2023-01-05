
import React from 'react';
import {
  GoogleMapsLoader,
  GeoSearch,
  Control,
  Marker,
} from 'react-instantsearch-dom-maps';
import { InstantSearch, Highlight, CurrentRefinements, Stats, RangeInput, Panel, RefinementList, HierarchicalMenu, SearchBox, Hits, Pagination, ToggleRefinement, ClearRefinements } from "react-instantsearch-dom";
import { searchkitClient } from './searchkitConfig'
import { uniqBy } from 'lodash';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function deduplicate(items) {
  return uniqBy(items, item => item.attribute);
}

const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });


function Hit({ hit }) {
  return (
    <div className='w-full flex gap-4'>
      <div className='w-1/4 max-h-96 overflow-hidden'>
        <Image src={hit.image} alt='' width={300} height={300} />
        <a href={`https://projectmirador.org/embed/?manifest=${hit.id}?as=iiif`} target="_blank" rel='noreferrer'>Open in Mirador</a>
        <br />
        <a href={hit.homepage} target="_blank" rel='noreferrer'>Open in Marcus</a>
      </div>

      <div className='w-3/4'>
        <h2 className='text-4xl font-bold'>
          <a href={hit.id} target='_blank' rel="noreferrer">
            <Highlight attribute="label_no" hit={hit} />
          </a>
        </h2>
        <div className='font-bold text-xl'>
          {hit.maker && hit.maker.map(m => (
            <>
              <Highlight key={m.id} attribute={m.label_no} hit={m} />
              {m.label_no}
            </>
          ))}
        </div>

        <div className='my-1 flex flex-wrap gap-2'>
          {hit.type ? hit.type.map(t => (
            <div key={t} className=' px-2 bg-green-600 text-white rounded'>{t}</div>
          )) : null}
        </div>

        <div className='my-1 inline-block px-2 bg-neutral-600 text-white rounded'>{hit.identifier}</div>

        <div className='my-1 flex flex-wrap gap-2'>
          {hit.subject ? hit.subject.map(t => (
            <div key={t.id} className=' px-2 bg-teal-600 text-white rounded'>{t.label_no}</div>
          )) : null}
        </div>

        <div className='my-1 flex flex-wrap gap-2'>
          {hit.spatial ? hit.spatial.map(t => (
            <div key={t.id} className=' px-2 bg-yellow-600 text-white rounded'>{t.label_no}</div>
          )) : null}
        </div>

        <div className='my-1 flex flex-wrap gap-2'>
          {hit.technique ? hit.technique.map(t => (
            <div key={t.id} className=' px-2 bg-purple-500 text-white rounded'>{t.label_no}</div>
          )) : null}
        </div>

        {hit.description_no ? (<div className='my-5'>{renderHTML(hit.description_no)}</div>) : null}

        {/* <div>
          <pre className='overflow-scroll max-w-full h-60'>
            <code>{JSON.stringify(hit, null, 2)}</code>
          </pre>
        </div> */}
      </div>
    </div>
  );
}

export default function SearchKit() {
  const { locale } = useRouter()

  return (
    <>
      <InstantSearch
        searchClient={searchkitClient}
        indexName="marcus-demo"
      >
        <SearchBox />
        <div style={{ display: 'flex', gap: '1em', width: '100%' }}>
          <div style={{ width: '25%' }}>
            <ClearRefinements />
            <h2>Skapere</h2>
            <RefinementList attribute="maker.label_no" searchable />
            <h2>Emner</h2>
            <RefinementList attribute="subject.label_no" searchable />
            {/* <HierarchicalMenu
              attributes={[
                'hierarchicalPlaces.lvl0',
                'hierarchicalPlaces.lvl1',
                'hierarchicalPlaces.lvl2',
              ]}
              defaultRefinement="Bergen"
            /> */}
            <h2>Steder</h2>
            <RefinementList attribute="spatial.label_no" searchable />
            <h2>WIP: CREATED</h2>
            <RangeInput attribute="created" />
          </div>
          <div style={{ width: '75%' }}>
            <Stats />
            <CurrentRefinements
              transformItems={items => deduplicate(items)}
            />
            <Pagination />
            <Hits hitComponent={Hit} />
            <Pagination />
          </div>
        </div>
      </InstantSearch>


      {/* <div style={{ height: 500 }}>
        <GoogleMapsLoader apiKey={process.env.GOOGLE_MAPS_APIKEY}>
          {google => (
            <GeoSearch google={google}>
              {({ hits }) => (
                <div>
                  <Control />
                  {hits.map(hit => (
                    <Marker key={hit.objectID} hit={hit} />
                  ))}
                </div>
              )}
            </GeoSearch>
          )}
        </GoogleMapsLoader>
      </div> */}
    </>
  )
}