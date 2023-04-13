
import React, { useState } from 'react';
/* import {
  GoogleMapsLoader,
  GeoSearch,
  Control,
  Marker,
} from 'react-instantsearch-dom-maps'; */
import { connectHits, InstantSearch, CurrentRefinements, Stats, RangeInput, Panel, RefinementList, HierarchicalMenu, SearchBox, Hits, Pagination, ToggleRefinement, ClearRefinements } from "react-instantsearch-dom";
import { searchkitClient } from './searchkitConfig'
import { uniqBy } from 'lodash';
import { useRouter } from 'next/navigation';
import { HitList, HitCard } from './Hit'
import * as Switch from '@radix-ui/react-switch';
import styles from './SearchKit.module.css'

const CustomHitsList = connectHits(HitList);
const CustomHitsCard = connectHits(HitCard);

function deduplicate(items) {
  return uniqBy(items, item => item.attribute);
}

export default function SearchKit() {
  const { locale } = useRouter()
  const [viewer, toggleViewer] = useState(false)

  const onOptionChange = e => {
    toggleViewer(!viewer)
  }

  return (
    <>
      <InstantSearch
        searchClient={searchkitClient}
        indexName="marcus-demo"
      >
        <SearchBox />
        <div style={{ display: 'flex', gap: '2em', width: '100%' }}>
          <div style={{ width: '20%' }}>
            <ClearRefinements />
            <form>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label className={styles.Label} htmlFor="viewer" style={{ paddingRight: 15 }}>
                  Card view
                </label>
                <Switch.Root className={styles.SwitchRoot} id="viewer" onCheckedChange={onOptionChange}>
                  <Switch.Thumb className={styles.SwitchThumb} />
                </Switch.Root>
                <label className={styles.Label} htmlFor="viewer" style={{ paddingLeft: 15 }}>
                  List view
                </label>
              </div>
            </form>

            <RefinementList attribute="type" searchable />
            <h2>Skapere</h2>
            <RefinementList attribute="maker.label_none" searchable />
            <h2>Emner</h2>
            <RefinementList attribute="subject.label_none" searchable />
            {/* <HierarchicalMenu
              attributes={[
                'hierarchicalPlaces.lvl0',
                'hierarchicalPlaces.lvl1',
                'hierarchicalPlaces.lvl2',
              ]}
              defaultRefinement="Bergen"
            /> */}

            <h2>Steder</h2>
            <RefinementList attribute="spatial.label_none" searchable />

          </div>
          <div style={{ width: '80%' }}>
            <Stats />
            <CurrentRefinements
              transformItems={items => deduplicate(items)}
            />
            <Pagination />
            {
              viewer ? <CustomHitsCard /> : <CustomHitsList />
            }
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