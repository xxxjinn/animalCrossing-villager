import { createRouter } from "../core/router";
import Home from "./Home";
import VillagerProfile from "./VillagerProfile";
import AddVillager from "./AddVillager";
import NotFound from "./NotFound";

export default createRouter([
  { path: "#/", component: Home },
  { path: "#/profile", component: VillagerProfile },
  { path: "#/add", component: AddVillager },
  { path: ".*", component: NotFound },
]);
