import { logger } from "./app/logger.js";
import {web} from "./app/web.js"

const port = 4000;


web.listen(port, () => {
    logger.info(`app listening on http://localhost:${port}`);
})