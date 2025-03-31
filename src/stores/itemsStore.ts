/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useItemsStore = defineStore('itemsStore', () => {
  type locationType = {
    id: number;
    location: string;
  };

  type authorType = {
    id: number;
    name: string;
  };

  type itemType = {
    authorId: number;
    created: string;
    id: number;
    imageUrl: string;
    locationId: number;
    name: string;
  };

  type fullItemType = {
    authorId: number;
    created: string;
    id: number;
    imageUrl: string;
    locationId: number;
    name: string;
    author?: string;
    location?: string;
  };

  const authors = ref<authorType[]>([]);
  const locations = ref<locationType[]>([]);
  const fullItems = ref<fullItemType[]>([]);
  const items = ref<itemType[]>([]);
  const searchParams = ref<string>('');
  const page = ref<number>(1);
  const totalItems = ref<number>(1);

  const getAuthors = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`https://test-front.framework.team/authors`);
      authors.value = data;
    } catch (err) {
      console.log(err);
    }
  };

  const getLocations = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`https://test-front.framework.team/locations`);
      locations.value = data;
    } catch (err) {
      console.log(err);
    }
  };

  const countTotal = async (): Promise<void> => {
    try {
      const { data } = await axios.get(
        `https://test-front.framework.team/paintings?q=${searchParams.value}`,
      );
      totalItems.value = data.length;
    } catch (err) {
      console.log(err);
    }
  };

  const makeFullItems = async (): Promise<void> => {
    try {
      await countTotal();
      const { data } = await axios.get(
        `https://test-front.framework.team/paintings?_limit=6&_page=${page.value}&q=${searchParams.value.toLowerCase()}`,
      );
      items.value = data;
      if (authors.value.length < 1) {
        await getAuthors();
      }
      if (locations.value.length < 1) {
        await getLocations();
      }

      fullItems.value = items.value.map((obj) => {
        const correctAuthor = authors.value.find((author) => author.id === obj.authorId);
        if (correctAuthor) {
          return {
            ...obj,
            author: correctAuthor.name,
          };
        }
        return obj;
      });

      fullItems.value = fullItems.value.map((obj) => {
        const correctLocation = locations.value.find((location) => location.id === obj.locationId);
        if (correctLocation) {
          return {
            ...obj,
            location: correctLocation.location,
          };
        }
        return obj;
      });

      // Следующие строчки (вплоть до "catch") можно убрать. Их я добавил для того,
      // чтобы отловить (и исправить их свойства) некоторые объекты, которые в JSON, по моему мнению,
      // приходят с несовсем корректно указанными свойствами 'name' (строчки 115-121),
      // и 'imageUrl' (строчки 123-129). 'Id' этих объектов 7 и 13 соответственно
      const itemWithWrongName: fullItemType | undefined = fullItems.value.find(
        (obj) => obj.name === 'The',
      );
      if (itemWithWrongName) {
        const indexOfItemWithWrongName: number = fullItems.value.indexOf(itemWithWrongName);
        fullItems.value[indexOfItemWithWrongName].name = 'Summer night Inger on the beach';
      }

      const itemWithWrongUrl: fullItemType | undefined = fullItems.value.find(
        (obj) => obj.id === 13,
      );
      if (itemWithWrongUrl) {
        const indexOfItemWithWrongUrl: number = fullItems.value.indexOf(itemWithWrongUrl);
        fullItems.value[indexOfItemWithWrongUrl].imageUrl = '/images/Temptations_of_Christ.jpeg';
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { makeFullItems, fullItems, page, searchParams, totalItems };
});
