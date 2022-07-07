export interface Field {
  name: string;
  value: string;
  inline: boolean;
}

import axios from "axios";

export default function request(fields: Field[] | null) {
  return axios.post(process.env.WEBHOOK_URL as string, {
    content: null,
    embeds: [
      {
        color: null,
        fields: fields,
      },
    ],
    username: "Log",
    attachments: [],
  });
}
