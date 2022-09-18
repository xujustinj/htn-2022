import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export function Music() {
    return (
        // <div className='p-3'>
        //     <FontAwesomeIcon icon={faSearch} className='text-white text-xl' />
        //     <input className='border rounded bg-myBlue text-white' />
        // </div>
        <div className="p-4 ml-6">
            <label for="table-search" className="sr-only">Search</label>
            <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"></path>
                    </svg>
                </div>
                <input type="text" id="table-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Wikipedia" />
            </div>
            <h2 className='text-white  mr-10 mt-10 text-4xl font-sans-serif mt-3  tracking-wide 	'>
                <b>Create your video</b>
            </h2>

            <ul class="mt-5 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li class="mr-2">
                    <a href="/vid" class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Length</a>
                </li>
                <li class="mr-2">
                    <a href="/formality"  class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Formality</a>
                </li>
                <li class="mr-2">
                    <a href="/voice" class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Voice</a>
                </li>
                <li class="mr-2">
                    <a href="/music" aria-current="page" class="flex p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500" >Music</a>
                </li>

            </ul>

            <div id="info-popup" tabindex="-1" className=" flex justify-start mt-60 ml-6 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                <div class="relative p-4 w-full max-w-lg h-full md:h-auto">
                    <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
                        <div class="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
                            <h3 class="mb-3 text-2xl font-bold text-gray-900 dark:text-white">Which AI Model would you like to speak?</h3>

                            <div class="justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0">
            
              <div class="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
                  <button id="close-modal" type="button"  class="py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 sm:w-auto hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Monotone</button>
                  <button id="close-modal" type="button"  class="py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 sm:w-auto hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Uplifiting</button>
                  <button id="confirm-button" type="button" class="py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 sm:w-auto hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">None</button>

              </div>
          </div>
          



                           


                        </div>

                    </div>
                </div>


            </div>
            


        </div>
        
    )
}
