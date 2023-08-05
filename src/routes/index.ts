import auth from "./auth.routes";
import agent from "./agent.routes";
import listings from "./listings.routes";
import articles from "./article.routes";
import comments from "./comment.routes";
import reviews from "./reviews.routes";
import chats from "./chat.route";
import messages from "./message.route";

const routes = {
  auth,
  agent,
  listings,
  articles,
  comments,
  reviews,
  chats,
  messages,
};

export default routes;
