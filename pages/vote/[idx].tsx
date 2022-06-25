import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Load from "../../components/loading";
import axios from "axios";
import { toast } from "react-toastify";
import Head from "next/head";

const problems = require("./../../rank.json");
const problemKey = Object.keys(problems);

export default function Vote() {
  const router = useRouter();
  const [rank, setRank] = useState<number>(15);
  const [voting, setVoting] = useState<boolean>(false);

  const { idx } = router.query;

  if (!problemKey.includes(idx as string)) {
    return <></>;
  }

  const RankImages: { [key: string]: string } = {
    "0": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAApUlEQVQ4T42SMQ7EMAgEt3Hp0m2uzf3/gRfZ0p5gBFIKpARYYCfR57p+O9ZaJ+ac/+cxxolYc859cjGKY6MHOOceL1YlqK7gNQ5VZ33vO9mKw2hHFJMJL+S7OLkTdhblBL8ErUVRYsDtpG1b5JIYcOtbHiXEKK4sOZ8gUtxt48DDwBPdzAYOIhtxg8UE13FJA2LTFkevFZcSIi3xbNZU/SD034l3PCcsLux3p2BFAAAAAElFTkSuQmCC",
    "1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA00lEQVQ4T5WSPRJBQRCE35VkQplSJRAJyKSEspc5gdgF5I4gcgIXcJBVrerbNzOGJegaO2+650d3j8OugHu/rpHfEcrf9sty3c7LeTUpnZJKkBR4R0GBmstmWk6L8SCgqGSLTJ0TsIqRzDt2VjzORoOA7QziatpZEFnvKvArWZ0VmcQJxLFbZCfwDxkB1VSBjKyib2QnkJERsOR4bOeDjMy1PxnMCVgyyMa293JGwmGxc0Z+O6K1JmRy0SPUOSNx7RaZYzPdawV2QUSQMpF/IvsuPAGa8nsE7aOuGwAAAABJRU5ErkJggg==",
    "2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA00lEQVQ4T5WSPRJBQRCE35VkQplSJRAJyKSEspc5gdgF5I4gcgIXcJBVrerbNzOGJegaO2+650d3j8OugHu/rpHfEcrf9sty3c7LeTUpnZJKkBR4R0GBmstmWk6L8SCgqGSLTJ0TsIqRzDt2VjzORoOA7QziatpZEFnvKvArWZ0VmcQJxLFbZCfwDxkB1VSBjKyib2QnkJERsOR4bOeDjMy1PxnMCVgyyMa293JGwmGxc0Z+O6K1JmRy0SPUOSNx7RaZYzPdawV2QUSQMpF/IvsuPAGa8nsE7aOuGwAAAABJRU5ErkJggg==",
    "3": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA00lEQVQ4T5WSPRJBQRCE35VkQplSJRAJyKSEspc5gdgF5I4gcgIXcJBVrerbNzOGJegaO2+650d3j8OugHu/rpHfEcrf9sty3c7LeTUpnZJKkBR4R0GBmstmWk6L8SCgqGSLTJ0TsIqRzDt2VjzORoOA7QziatpZEFnvKvArWZ0VmcQJxLFbZCfwDxkB1VSBjKyib2QnkJERsOR4bOeDjMy1PxnMCVgyyMa293JGwmGxc0Z+O6K1JmRy0SPUOSNx7RaZYzPdawV2QUSQMpF/IvsuPAGa8nsE7aOuGwAAAABJRU5ErkJggg==",
    "4": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA00lEQVQ4T5WSPRJBQRCE35VkQplSJRAJyKSEspc5gdgF5I4gcgIXcJBVrerbNzOGJegaO2+650d3j8OugHu/rpHfEcrf9sty3c7LeTUpnZJKkBR4R0GBmstmWk6L8SCgqGSLTJ0TsIqRzDt2VjzORoOA7QziatpZEFnvKvArWZ0VmcQJxLFbZCfwDxkB1VSBjKyib2QnkJERsOR4bOeDjMy1PxnMCVgyyMa293JGwmGxc0Z+O6K1JmRy0SPUOSNx7RaZYzPdawV2QUSQMpF/IvsuPAGa8nsE7aOuGwAAAABJRU5ErkJggg==",
    "5": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA00lEQVQ4T5WSPRJBQRCE35VkQplSJRAJyKSEspc5gdgF5I4gcgIXcJBVrerbNzOGJegaO2+650d3j8OugHu/rpHfEcrf9sty3c7LeTUpnZJKkBR4R0GBmstmWk6L8SCgqGSLTJ0TsIqRzDt2VjzORoOA7QziatpZEFnvKvArWZ0VmcQJxLFbZCfwDxkB1VSBjKyib2QnkJERsOR4bOeDjMy1PxnMCVgyyMa293JGwmGxc0Z+O6K1JmRy0SPUOSNx7RaZYzPdawV2QUSQMpF/IvsuPAGa8nsE7aOuGwAAAABJRU5ErkJggg==",
    "6": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiElEQVQ4T72TPQrAIAxGvf9p7OjoCaSLk4OTgzh5gZQIldT/Qu3wIGAi3yOEnUqBlDKB9Yi7j/YzLGKMFSGEjPcenHMVOJs+aD2uIIQAdnAOxpgu1tqM1voBznYVSo1ugm0KNHorflOBRh5F/0dhZROvttDS2a8w20RXYRb9W4XyRCnYgNC65AIOk5NQUUbqSQAAAABJRU5ErkJggg==",
    "7": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiElEQVQ4T72TPQrAIAxGvf9p7OjoCaSLk4OTgzh5gZQIldT/Qu3wIGAi3yOEnUqBlDKB9Yi7j/YzLGKMFSGEjPcenHMVOJs+aD2uIIQAdnAOxpgu1tqM1voBznYVSo1ugm0KNHorflOBRh5F/0dhZROvttDS2a8w20RXYRb9W4XyRCnYgNC65AIOk5NQUUbqSQAAAABJRU5ErkJggg==",
    "8": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiElEQVQ4T72TPQrAIAxGvf9p7OjoCaSLk4OTgzh5gZQIldT/Qu3wIGAi3yOEnUqBlDKB9Yi7j/YzLGKMFSGEjPcenHMVOJs+aD2uIIQAdnAOxpgu1tqM1voBznYVSo1ugm0KNHorflOBRh5F/0dhZROvttDS2a8w20RXYRb9W4XyRCnYgNC65AIOk5NQUUbqSQAAAABJRU5ErkJggg==",
    "9": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiElEQVQ4T72TPQrAIAxGvf9p7OjoCaSLk4OTgzh5gZQIldT/Qu3wIGAi3yOEnUqBlDKB9Yi7j/YzLGKMFSGEjPcenHMVOJs+aD2uIIQAdnAOxpgu1tqM1voBznYVSo1ugm0KNHorflOBRh5F/0dhZROvttDS2a8w20RXYRb9W4XyRCnYgNC65AIOk5NQUUbqSQAAAABJRU5ErkJggg==",
    "10": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiElEQVQ4T72TPQrAIAxGvf9p7OjoCaSLk4OTgzh5gZQIldT/Qu3wIGAi3yOEnUqBlDKB9Yi7j/YzLGKMFSGEjPcenHMVOJs+aD2uIIQAdnAOxpgu1tqM1voBznYVSo1ugm0KNHorflOBRh5F/0dhZROvttDS2a8w20RXYRb9W4XyRCnYgNC65AIOk5NQUUbqSQAAAABJRU5ErkJggg==",
    "11": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA0UlEQVQ4T4VSMRLCMAzrXxi68wBmNn7GMfGb/qAbCyMPYGVgoKZ2o1S13XbQpZYjpVbSfPpWGN/uYMg433vcj9Loh/xuMkhnkPdlwshVgHueJhS+GpiwNIfXOYj8n2FPMPBiq4sBoJzxY98M1LVuxqmJGAeADwZ74myk/trOIbJ4cdKKODXIxFzztepqBpzBltiHqXUIcUvMJuBnA1xhMnNAOWwxQk06CQw9W10vGuy8Pg5zMYLCb2CxzwCG1YCvZk3M4+DV2gjqotCCvwHP+foPVUIDi068x+0AAAAASUVORK5CYII=",
    "12": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA0UlEQVQ4T4VSMRLCMAzrXxi68wBmNn7GMfGb/qAbCyMPYGVgoKZ2o1S13XbQpZYjpVbSfPpWGN/uYMg433vcj9Loh/xuMkhnkPdlwshVgHueJhS+GpiwNIfXOYj8n2FPMPBiq4sBoJzxY98M1LVuxqmJGAeADwZ74myk/trOIbJ4cdKKODXIxFzztepqBpzBltiHqXUIcUvMJuBnA1xhMnNAOWwxQk06CQw9W10vGuy8Pg5zMYLCb2CxzwCG1YCvZk3M4+DV2gjqotCCvwHP+foPVUIDi068x+0AAAAASUVORK5CYII=",
    "13": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA0UlEQVQ4T4VSMRLCMAzrXxi68wBmNn7GMfGb/qAbCyMPYGVgoKZ2o1S13XbQpZYjpVbSfPpWGN/uYMg433vcj9Loh/xuMkhnkPdlwshVgHueJhS+GpiwNIfXOYj8n2FPMPBiq4sBoJzxY98M1LVuxqmJGAeADwZ74myk/trOIbJ4cdKKODXIxFzztepqBpzBltiHqXUIcUvMJuBnA1xhMnNAOWwxQk06CQw9W10vGuy8Pg5zMYLCb2CxzwCG1YCvZk3M4+DV2gjqotCCvwHP+foPVUIDi068x+0AAAAASUVORK5CYII=",
    "14": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA0UlEQVQ4T4VSMRLCMAzrXxi68wBmNn7GMfGb/qAbCyMPYGVgoKZ2o1S13XbQpZYjpVbSfPpWGN/uYMg433vcj9Loh/xuMkhnkPdlwshVgHueJhS+GpiwNIfXOYj8n2FPMPBiq4sBoJzxY98M1LVuxqmJGAeADwZ74myk/trOIbJ4cdKKODXIxFzztepqBpzBltiHqXUIcUvMJuBnA1xhMnNAOWwxQk06CQw9W10vGuy8Pg5zMYLCb2CxzwCG1YCvZk3M4+DV2gjqotCCvwHP+foPVUIDi068x+0AAAAASUVORK5CYII=",
    "15": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA0UlEQVQ4T4VSMRLCMAzrXxi68wBmNn7GMfGb/qAbCyMPYGVgoKZ2o1S13XbQpZYjpVbSfPpWGN/uYMg433vcj9Loh/xuMkhnkPdlwshVgHueJhS+GpiwNIfXOYj8n2FPMPBiq4sBoJzxY98M1LVuxqmJGAeADwZ74myk/trOIbJ4cdKKODXIxFzztepqBpzBltiHqXUIcUvMJuBnA1xhMnNAOWwxQk06CQw9W10vGuy8Pg5zMYLCb2CxzwCG1YCvZk3M4+DV2gjqotCCvwHP+foPVUIDi068x+0AAAAASUVORK5CYII=",
    "16": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABA0lEQVQ4y21TqwoCURDdj7CIDzZZTAqLRjFuMglGk9luVBBFEMHmH/iRV894z3B23DDM+8zr3mK0eady9UrgSrTNdo802V5NH9TPP15AKOuLGSwwy+D9+T0NlyeXVQd1q2MqrNpXYRWQBlEG71VnA6E+XBx+AJ7AbnJFygTVLhoAXikDeEBOIsh4fWvYHAAOryatMxhcY2hr7IABOnOcXW2mxx1oRRLbJgj90A0Ad46JlBsbzzoSfcwI4G2Gd0AfAQjsO1B03Xp8TLELA+CNGQSnLo2V9cStV9CZFYQV4+uEvTPdy18QR9vM8To+An5U3HZcqgJqJ94BkNqIcyKQY0FW+gAc3u0xFeYdvwAAAABJRU5ErkJggg==",
    "17": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABA0lEQVQ4y21TqwoCURDdj7CIDzZZTAqLRjFuMglGk9luVBBFEMHmH/iRV894z3B23DDM+8zr3mK0eady9UrgSrTNdo802V5NH9TPP15AKOuLGSwwy+D9+T0NlyeXVQd1q2MqrNpXYRWQBlEG71VnA6E+XBx+AJ7AbnJFygTVLhoAXikDeEBOIsh4fWvYHAAOryatMxhcY2hr7IABOnOcXW2mxx1oRRLbJgj90A0Ad46JlBsbzzoSfcwI4G2Gd0AfAQjsO1B03Xp8TLELA+CNGQSnLo2V9cStV9CZFYQV4+uEvTPdy18QR9vM8To+An5U3HZcqgJqJ94BkNqIcyKQY0FW+gAc3u0xFeYdvwAAAABJRU5ErkJggg==",
    "18": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABA0lEQVQ4y21TqwoCURDdj7CIDzZZTAqLRjFuMglGk9luVBBFEMHmH/iRV894z3B23DDM+8zr3mK0eady9UrgSrTNdo802V5NH9TPP15AKOuLGSwwy+D9+T0NlyeXVQd1q2MqrNpXYRWQBlEG71VnA6E+XBx+AJ7AbnJFygTVLhoAXikDeEBOIsh4fWvYHAAOryatMxhcY2hr7IABOnOcXW2mxx1oRRLbJgj90A0Ad46JlBsbzzoSfcwI4G2Gd0AfAQjsO1B03Xp8TLELA+CNGQSnLo2V9cStV9CZFYQV4+uEvTPdy18QR9vM8To+An5U3HZcqgJqJ94BkNqIcyKQY0FW+gAc3u0xFeYdvwAAAABJRU5ErkJggg==",
    "19": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABA0lEQVQ4y21TqwoCURDdj7CIDzZZTAqLRjFuMglGk9luVBBFEMHmH/iRV894z3B23DDM+8zr3mK0eady9UrgSrTNdo802V5NH9TPP15AKOuLGSwwy+D9+T0NlyeXVQd1q2MqrNpXYRWQBlEG71VnA6E+XBx+AJ7AbnJFygTVLhoAXikDeEBOIsh4fWvYHAAOryatMxhcY2hr7IABOnOcXW2mxx1oRRLbJgj90A0Ad46JlBsbzzoSfcwI4G2Gd0AfAQjsO1B03Xp8TLELA+CNGQSnLo2V9cStV9CZFYQV4+uEvTPdy18QR9vM8To+An5U3HZcqgJqJ94BkNqIcyKQY0FW+gAc3u0xFeYdvwAAAABJRU5ErkJggg==",
    "20": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABA0lEQVQ4y21TqwoCURDdj7CIDzZZTAqLRjFuMglGk9luVBBFEMHmH/iRV894z3B23DDM+8zr3mK0eady9UrgSrTNdo802V5NH9TPP15AKOuLGSwwy+D9+T0NlyeXVQd1q2MqrNpXYRWQBlEG71VnA6E+XBx+AJ7AbnJFygTVLhoAXikDeEBOIsh4fWvYHAAOryatMxhcY2hr7IABOnOcXW2mxx1oRRLbJgj90A0Ad46JlBsbzzoSfcwI4G2Gd0AfAQjsO1B03Xp8TLELA+CNGQSnLo2V9cStV9CZFYQV4+uEvTPdy18QR9vM8To+An5U3HZcqgJqJ94BkNqIcyKQY0FW+gAc3u0xFeYdvwAAAABJRU5ErkJggg==",
    "21": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAzklEQVQ4T4VSQQoCMRDbF3jzOb7Ad3j3RT5E8OLBH3gXZL2I4EUvgpUMpGbT2d1CaCfTpJ1pu/XjVhSrSx/IOM8tj6fSYXEu78Kx+94D4Ahym9c1QL4aYDC5/Twbkd+MexoDFyOmAQEOQD4M4MrNFGZiHkC+MZgTZyUt9od/E1WsJ42JU4NMrLE+K+Yw0B5Mib2ZiJsmTonVhHw1oCCr2cHDBiXwSlnDmMPsucZg7vdpMwclAL5Bxd4DGlYDfZoxsZbDXxslwAVAoGvCOY9/d/YymordHfcAAAAASUVORK5CYII=",
    "22": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAzklEQVQ4T4VSQQoCMRDbF3jzOb7Ad3j3RT5E8OLBH3gXZL2I4EUvgpUMpGbT2d1CaCfTpJ1pu/XjVhSrSx/IOM8tj6fSYXEu78Kx+94D4Ahym9c1QL4aYDC5/Twbkd+MexoDFyOmAQEOQD4M4MrNFGZiHkC+MZgTZyUt9od/E1WsJ42JU4NMrLE+K+Yw0B5Mib2ZiJsmTonVhHw1oCCr2cHDBiXwSlnDmMPsucZg7vdpMwclAL5Bxd4DGlYDfZoxsZbDXxslwAVAoGvCOY9/d/YymordHfcAAAAASUVORK5CYII=",
    "23": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAzklEQVQ4T4VSQQoCMRDbF3jzOb7Ad3j3RT5E8OLBH3gXZL2I4EUvgpUMpGbT2d1CaCfTpJ1pu/XjVhSrSx/IOM8tj6fSYXEu78Kx+94D4Ahym9c1QL4aYDC5/Twbkd+MexoDFyOmAQEOQD4M4MrNFGZiHkC+MZgTZyUt9od/E1WsJ42JU4NMrLE+K+Yw0B5Mib2ZiJsmTonVhHw1oCCr2cHDBiXwSlnDmMPsucZg7vdpMwclAL5Bxd4DGlYDfZoxsZbDXxslwAVAoGvCOY9/d/YymordHfcAAAAASUVORK5CYII=",
    "24": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAzklEQVQ4T4VSQQoCMRDbF3jzOb7Ad3j3RT5E8OLBH3gXZL2I4EUvgpUMpGbT2d1CaCfTpJ1pu/XjVhSrSx/IOM8tj6fSYXEu78Kx+94D4Ahym9c1QL4aYDC5/Twbkd+MexoDFyOmAQEOQD4M4MrNFGZiHkC+MZgTZyUt9od/E1WsJ42JU4NMrLE+K+Yw0B5Mib2ZiJsmTonVhHw1oCCr2cHDBiXwSlnDmMPsucZg7vdpMwclAL5Bxd4DGlYDfZoxsZbDXxslwAVAoGvCOY9/d/YymordHfcAAAAASUVORK5CYII=",
    "25": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAzklEQVQ4T4VSQQoCMRDbF3jzOb7Ad3j3RT5E8OLBH3gXZL2I4EUvgpUMpGbT2d1CaCfTpJ1pu/XjVhSrSx/IOM8tj6fSYXEu78Kx+94D4Ahym9c1QL4aYDC5/Twbkd+MexoDFyOmAQEOQD4M4MrNFGZiHkC+MZgTZyUt9od/E1WsJ42JU4NMrLE+K+Yw0B5Mib2ZiJsmTonVhHw1oCCr2cHDBiXwSlnDmMPsucZg7vdpMwclAL5Bxd4DGlYDfZoxsZbDXxslwAVAoGvCOY9/d/YymordHfcAAAAASUVORK5CYII=",
    "26": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAElBMVEUAAABzDACUFACkGAi9IAjmIAgd4YarAAAAAXRSTlMAQObYZgAAAF9JREFUGBkFwYFhBCEABCFGL/1X/G6gPwDAZ5qRRge2x/aMg9d6b/PDEc86s3Ny77ZhuE+HV0C/cawNmObQCchyJDmJOPiZd01yr0hPrD6mJdI6am4syWdOakV8ggT4B9TJMj71DhNqAAAAAElFTkSuQmCC",
    "27": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAElBMVEUAAABzDACUFACkGAi9IAjmIAgd4YarAAAAAXRSTlMAQObYZgAAAF9JREFUGBkFwYFhBCEABCFGL/1X/G6gPwDAZ5qRRge2x/aMg9d6b/PDEc86s3Ny77ZhuE+HV0C/cawNmObQCchyJDmJOPiZd01yr0hPrD6mJdI6am4syWdOakV8ggT4B9TJMj71DhNqAAAAAElFTkSuQmCC",
    "28": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAElBMVEUAAABzDACUFACkGAi9IAjmIAgd4YarAAAAAXRSTlMAQObYZgAAAF9JREFUGBkFwYFhBCEABCFGL/1X/G6gPwDAZ5qRRge2x/aMg9d6b/PDEc86s3Ny77ZhuE+HV0C/cawNmObQCchyJDmJOPiZd01yr0hPrD6mJdI6am4syWdOakV8ggT4B9TJMj71DhNqAAAAAElFTkSuQmCC",
    "29": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAElBMVEUAAABzDACUFACkGAi9IAjmIAgd4YarAAAAAXRSTlMAQObYZgAAAF9JREFUGBkFwYFhBCEABCFGL/1X/G6gPwDAZ5qRRge2x/aMg9d6b/PDEc86s3Ny77ZhuE+HV0C/cawNmObQCchyJDmJOPiZd01yr0hPrD6mJdI6am4syWdOakV8ggT4B9TJMj71DhNqAAAAAElFTkSuQmCC",
    "30": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAElBMVEUAAABzDACUFACkGAi9IAjmIAgd4YarAAAAAXRSTlMAQObYZgAAAF9JREFUGBkFwYFhBCEABCFGL/1X/G6gPwDAZ5qRRge2x/aMg9d6b/PDEc86s3Ny77ZhuE+HV0C/cawNmObQCchyJDmJOPiZd01yr0hPrD6mJdI6am4syWdOakV8ggT4B9TJMj71DhNqAAAAAElFTkSuQmCC",
    "31": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAwUlEQVQ4T52R0Q2DQAxD2QKpYoEO0AEqdRJGqToES5QtGKNTVOovxSec+pJQIT6s3EXhOT6adrrNR3UaL3ODw/3zDLq+H1WF2ldfhB7UDecfwNPVJetVAFxY/RZ0VfcA4Ab/NlFnVMxuAvwW3KzEWbZgDREUwA/96gZY5gJAQXTdBaBzBeLDrdlDzSJkAAx75xTApkbgXWE2qxGMLo5bSgH6ePZwAIsww61ChD3OXoBVAM1qzry7Hn9xAYCGwxHh2y/m+kzA61j7uAAAAABJRU5ErkJggg==",
  };
  const rankName = [
    "Unknown",
    "Copper 5",
    "Copper 4",
    "Copper 3",
    "Copper 2",
    "Copper 1",
    "Silver 5",
    "Silver 4",
    "Silver 3",
    "Silver 2",
    "Silver 1",
    "Gold 5",
    "Gold 4",
    "Gold 3",
    "Gold 2",
    "Gold 1",
    "Emerald 5",
    "Emerald 4",
    "Emerald 3",
    "Emerald 2",
    "Emerald 1",
    "Diamond 5",
    "Diamond 4",
    "Diamond 3",
    "Diamond 2",
    "Diamond 1",
    "Redstone 5",
    "Redstone 4",
    "Redstone 3",
    "Redstone 2",
    "Redstone 1",
  ];

  const changeHandler = (e: any) => {
    let data = e.target.value;
    setRank(data);
  };

  const voteHandler = (e: any) => {
    if (voting) return;
    setVoting(true);
    axios
      .get(
        `/api/rank/vote/${idx}/${rank}/${localStorage.getItem("auth_token")}`
      )
      .then((d) => {
        toast.success("Successfully voted!");
        setVoting(false);
        router.push("/");
      });
  };

  if (window.localStorage.getItem("auth_token") == null) {
    router.push("/login");
    alert("Sorry, but you are not logged in.");
  }

  return (
    <>
      <Head>
        <title>
          Jungoler | Vote | {problems[idx as any]} # {idx}
        </title>
      </Head>
      {voting ? <Load /> : null}
      <header
        style={{
          textAlign: "center",
        }}
      >
        <h1>
          Vote rank to problem "{problems[idx as any]} # {idx}"
        </h1>
      </header>

      <div>
        <div
          style={{
            textAlign: "center",
            width: "100%",
          }}
        >
          <img
            style={{
              height: "2em",
              display: "inline",
            }}
            src={RankImages[rank]}
          />
          <h1
            style={{
              fontSize: "2em",
              display: "inline",
              marginLeft: "10px",
            }}
          >
            {rankName[rank]}
          </h1>
        </div>

        <input
          type={"range"}
          min="0"
          max={"30"}
          value={rank}
          onChange={changeHandler}
          style={{
            appearance: "none",
            width: "100%",
            height: "2px",
            background:
              "linear-gradient(to right, rgb(45, 45, 45) -1.66667%, rgb(45, 45, 45) 1.66667%, rgb(157, 73, 0) 1.66667%, rgb(157, 73, 0) 5%, rgb(165, 79, 0) 5%, rgb(165, 79, 0) 8.33333%, rgb(173, 86, 0) 8.33333%, rgb(173, 86, 0) 11.6667%, rgb(181, 93, 10) 11.6667%, rgb(181, 93, 10) 15%, rgb(198, 119, 57) 15%, rgb(198, 119, 57) 18.3333%, rgb(56, 84, 110) 18.3333%, rgb(56, 84, 110) 21.6667%, rgb(61, 90, 116) 21.6667%, rgb(61, 90, 116) 25%, rgb(67, 95, 122) 25%, rgb(67, 95, 122) 28.3333%, rgb(73, 101, 128) 28.3333%, rgb(73, 101, 128) 31.6667%, rgb(78, 106, 134) 31.6667%, rgb(78, 106, 134) 35%, rgb(210, 133, 0) 35%, rgb(210, 133, 0) 38.3333%, rgb(223, 143, 0) 38.3333%, rgb(223, 143, 0) 41.6667%, rgb(236, 154, 0) 41.6667%, rgb(236, 154, 0) 45%, rgb(249, 165, 24) 45%, rgb(249, 165, 24) 48.3333%, rgb(255, 176, 40) 48.3333%, rgb(255, 176, 40) 51.6667%, rgb(0, 199, 139) 51.6667%, rgb(0, 199, 139) 55%, rgb(0, 212, 151) 55%, rgb(0, 212, 151) 58.3333%, rgb(39, 226, 164) 58.3333%, rgb(39, 226, 164) 61.6667%, rgb(62, 240, 177) 61.6667%, rgb(62, 240, 177) 65%, rgb(81, 253, 189) 65%, rgb(81, 253, 189) 68.3333%, rgb(0, 158, 229) 68.3333%, rgb(0, 158, 229) 71.6667%, rgb(0, 169, 240) 71.6667%, rgb(0, 169, 240) 75%, rgb(0, 180, 252) 75%, rgb(0, 180, 252) 78.3333%, rgb(43, 191, 255) 78.3333%, rgb(43, 191, 255) 81.6667%, rgb(65, 202, 255) 81.6667%, rgb(65, 202, 255) 85%, rgb(224, 0, 76) 85%, rgb(224, 0, 76) 88.3333%, rgb(234, 0, 83) 88.3333%, rgb(234, 0, 83) 91.6667%, rgb(245, 0, 90) 91.6667%, rgb(245, 0, 90) 95%, rgb(255, 0, 98) 95%, rgb(255, 0, 98) 98.3333%, rgb(255, 48, 113) 98.3333%, rgb(255, 48, 113) 101.667%)",
          }}
        />

        <button
          style={{
            right: "10px",
            position: "absolute",
            padding: "5px",
            paddingLeft: "10px",
            paddingRight: "10px",
            background: "lightgreen",
            border: "none",
            fontSize: "large",
            fontWeight: "200",
            cursor: "pointer",
          }}
          onClick={voteHandler}
        >
          Vote!
        </button>
      </div>
    </>
  );
}
