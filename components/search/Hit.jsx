
import React from 'react';
import Image from 'next/image';
import * as HoverCard from '@radix-ui/react-hover-card';

const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });


export function HitCard({ hits }) {
  return (
    <section className='grid grid-cols-3 gap-x-3 gap-y-10 my-2 items-end'>
      {hits.map((hit) => (
        <article key={hit.objectID}>
          <a href={`https://chc-web.vercel.app/items/${hit.identifier}`} target='_blank' rel="noreferrer">
            <div className='flex flex-col gap-y-3'>
              <div className='relative flex flex-col flex-grow gap-y-3'>
                {
                  hit.image ? (
                    <Image src={hit.image} alt='' width={300} height={300} className="w-full object-contain" />
                  ) : (
                    <div className="min-h-64 p-10 inline-block flex-grow-1  w-full opacity-25 bg-gradient-to-r from-slate-500 to-yellow-100">
                      No image found!
                    </div>
                  )
                }
                <HoverCard.Root >
                  <HoverCard.Trigger asChild>
                    <a
                      className="flex justify-center items-center rounded-full font-serif text-neutral-400 bg-black w-8 h-8 absolute bottom-3 right-3 shadow-lg shadow-black border border-neutral-600"
                      href={`https://chc-web.vercel.app/items/${hit.identifier}`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      M
                    </a>
                  </HoverCard.Trigger>
                  <HoverCard.Portal>
                    <HoverCard.Content className="flex flex-col items-center bg-white w-96 shadow-2xl shadow-black p-3 rounded border border-neutral-300" sideOffset={5}>
                      <h2 className='text-lg font-bold'>
                        <a href={`https://chc-web.vercel.app/items/${hit.identifier}`} target='_blank' rel="noreferrer">
                          {/* <Highlight attribute="hit.label_none" hit={hit} /> */}
                          {hit.label_none ?? hit.label?.no}
                        </a>
                      </h2>
                      {hit.description_none ?? hit.description?.no ? (
                        <>
                          <div className='text-sm font-serif'>{renderHTML(hit.description_none ?? hit.description?.no)}</div>
                        </>
                      ) : null}

                      <a href={`https://projectmirador.org/embed/?manifest=${hit.subjectOfManifest}`} target="_blank" rel='noreferrer'>Open in Mirador</a>

                      <a href={hit.homepage} target="_blank" rel='noreferrer'>Open in Marcus</a>

                      <div className='font-bold text-lg'>
                        {hit.maker && hit.maker.map(m => (
                          <div key={m.id}>
                            {m.label_none}
                          </div>
                        ))}
                      </div>

                      <div className='my-1 flex flex-wrap gap-2'>
                        {Array.isArray(hit.type) ? hit.type.map(t => (
                          <div key={t} className=' px-2 bg-green-600 text-white rounded'>{t}</div>
                        )) : [hit.type].map(t => (
                          <div key={t} className=' px-2 bg-green-600 text-white rounded'>{t}</div>
                        ))}
                      </div>

                      <div className='my-1 inline-block px-2 bg-neutral-600 text-white rounded'>{hit.identifier}</div>

                      <div className='my-1 flex flex-wrap gap-2'>
                        {hit.subject ? hit.subject.map(t => (
                          <div key={t.id} className=' px-2 bg-teal-600 text-white rounded'>{t.label_none}</div>
                        )) : null}
                      </div>

                      <div className='my-1 flex flex-wrap gap-2'>
                        {hit.spatial ? hit.spatial.map(t => (
                          <div key={t.id} className=' px-2 bg-yellow-600 text-white rounded'>{t.label_none}</div>
                        )) : null}
                      </div>

                      <div className='my-1 flex flex-wrap gap-2'>
                        {hit.technique ? hit.technique.map(t => (
                          <div key={t.id} className=' px-2 bg-purple-500 text-white rounded'>{t.label_none}</div>
                        )) : null}
                      </div>


                      {/* <div>
                    <pre className='overflow-scroll max-w-full h-60'>
                      <code>{JSON.stringify(hit, null, 2)}</code>
                    </pre>
                  </div> */}

                      <HoverCard.Arrow className="HoverCardArrow" />
                    </HoverCard.Content>
                  </HoverCard.Portal>
                </HoverCard.Root>
              </div>
              <h2 className='text-lg font-light text-center'>
                <a href={`https://chc-web.vercel.app/items/${hit.identifier}`} target='_blank' rel="noreferrer">
                  {/* <Highlight attribute="hit.label_none" hit={hit} /> */}
                  {hit.label_none ?? hit.label_no ?? hit.identifier}
                </a>
              </h2>
            </div>
          </a>
        </article>
      ))
      }
    </section >
  );
}

export function HitList({ hits }) {
  return (
    <section className='grid grid-cols-1 gap-x-3 gap-y-10 my-2 items-end'>
      {hits.map((hit) => (
        <div key={hit.objectID} className='w-full flex gap-4'>
          <div className='w-4/12 overflow-hidden'>
            {hit.image ? (
              <Image src={hit.image} alt='' width={600} height={600} className="w-full object-contain" />
            ) : (
              <div className="h-64 opacity-25 bg-gradient-to-r from-slate-500 to-yellow-100"></div>
            )}
            <a href={`https://projectmirador.org/embed/?manifest=${hit.subjectOfManifest}`} target="_blank" rel='noreferrer'>Open in Mirador</a>
            <br />
            <a href={hit.homepage} target="_blank" rel='noreferrer'>Open in Marcus</a>
          </div>

          <div className='w-8/12 flex flex-col gap-2'>
            <h2 className='text-2xl font-light'>
              <a href={`https://chc-web.vercel.app/items/${hit.identifier}`} target='_blank' rel="noreferrer">
                {/* <Highlight attribute="hit.label_none" hit={hit} /> */}
                {hit.label_none ?? hit.label?.no}
              </a>
            </h2>

            <div className='font-bold text-xl'>
              {hit.maker && hit.maker.map(m => (
                <div key={m.id}>
                  {m.label_none}
                </div>
              ))}
            </div>

            <div className='flex flex-wrap gap-2'>
              {Array.isArray(hit.type) ? hit.type.map(t => (
                <div key={t} className='px-2 bg-green-100 rounded'>{t}</div>
              )) : [hit.type].map(t => (
                <div key={t} className='px-2 bg-green-100 rounded'>{t}</div>
              ))}
            </div>

            <div className='flex flex-wrap gap-2'>
              <div className='px-2 bg-neutral-100 rounded'>{hit.identifier}</div>
            </div>

            <div className='flex flex-wrap gap-2'>
              {hit.subject ? hit.subject.map(t => (
                <div key={t.id} className='px-2 bg-teal-100 rounded'>{t.label_none}</div>
              )) : null}
            </div>

            <div className='flex flex-wrap gap-2'>
              {hit.spatial ? hit.spatial.map(t => (
                <div key={t.id} className='px-2 bg-yellow-100 rounded'>{t.label_none}</div>
              )) : null}
            </div>

            <div className='flex flex-wrap gap-2'>
              {hit.technique ? hit.technique.map(t => (
                <div key={t.id} className='px-2 bg-purple-100 rounded'>{t.label_none}</div>
              )) : null}
            </div>

            {hit.description_none ?? hit.description?.no ? (
              <>
                <div className='text-sm font-serif'>{renderHTML(hit.description_none ?? hit.description?.no)}</div>
              </>
            ) : null}

            {/* <div>
          <pre className='overflow-scroll max-w-full h-60'>
            <code>{JSON.stringify(hit, null, 2)}</code>
          </pre>
        </div> */}
          </div>
        </div>
      ))
      }
    </section>
  );
}