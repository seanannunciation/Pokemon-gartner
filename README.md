# GartnerPokemon

Once the repository has been cloned, to install dependencies

In the terminal,
execute 'npm install'

Once all dependencies are installed run 'ng serve' in the terminal
Navigate to `http://localhost:4200/` The page should be displayed

--In the query type bar, enter the pokemon type value and click 'Add Pokemon' button

If a valid type is entered the data is stored in the local storage and loaded instantly in the table displayed below the search bar.

To search for a pokemon from the displayed/stored data, enter a pokemon name in the search bar above the displayed table.
The search results are displayed in the table below

-The icon next to the pokemon name in the table links to a new tab of the pokemon
-A pokemon record can be deleted from the storage by clicking on the cancel/close button displayed to the right end of each row.
-To load more pokemons to the storage enter a type query in the bar at the top of the page and click 'Add Pokemon'. The table displays all records from the storage and updates existing records that have the same name as the new records.
-The 'Name' of the pokemons in the table is editable - To edit, click on the name input and enter a desired name. Press Enter to save the modifed name to storage. Empty name values are not saved.