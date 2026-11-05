import type { Collections } from '@nuxt/content';

export type ArticleCard = Pick<
  Collections['pages'],
  'title' | 'description' | 'date' | 'tags' | 'path'
>;

export type TagsData = Record<
  string,
  {
    name: string;
    description: string;
    icon: string;
    value: Record<
      string,
      {
        name: string;
        description: string;
      }
    >;
  }
>;
