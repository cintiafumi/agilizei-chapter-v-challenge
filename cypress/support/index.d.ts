type Auth = {
  body: {
    user: {
      token: string;
    };
  };
};

type ArticleComment = {
  author: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  id: number;
};

type Article = {
  author: string;
  body: string;
  comments: ArticleComment[];
  createdAt: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
};

type Articles = {
  articles: Article[];
  articlesCount: number;
};

declare namespace Cypress {
  interface Chainable {
    /**
     * @example cy.auth()
     */
    auth(): void;

    /**
     * @example cy.login()
     */
    login(): void;

    /**
     * @example cy.logout()
     */
    logout(): void;

    /**
     * @example cy.createRandomArticle(5)
     */
    createRandomArticle(n: number): void;

    /**
     * @example cy.getArticles()
     */
    getArticles(): Promise<Articles>;

    /**
     * @example cy.deleteAllArticles()
     */
    deleteAllArticles(): Promise<void>;

    /**
     * @example cy.deleteArticle('id')
     */
    deleteArticle(id: string): Promise<void>;
  }
}
