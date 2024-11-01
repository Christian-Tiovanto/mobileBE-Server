import axios from "axios";
import { schedule } from "node-cron";
import { MedicubeService } from "./medicube.service";
import getFormattedTime from "../utils/get-hour-and-minute";

const medicubeService = new MedicubeService();
export function scheduleNotificationJob() {
  schedule("*/15 * * * *", async () => {
    const medicubes = await medicubeService.getAllSchedulesByClock(
      getFormattedTime()
    );
    medicubes.forEach((medicube) => {
      const url = `https://graph.facebook.com/${process.env.VERSION}/${process.env.MEDICUBE_PHONE_NUMBER}/messages`;
      const data = {
        messaging_product: "whatsapp",
        to: medicube.phone_number,
        type: "template",
        template: {
          name: "hello_world",
          language: {
            code: "en_US",
          },
        },
      };

      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${process.env.TOKEN}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  });
}
