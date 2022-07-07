import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export default async function UPLOAD(
  content: string,
  path: string,
  branch: string = "main"
) {
  const owner = "Oein";
  const repo = "Jungoler";
  const cnt = Buffer.from(content, "utf8").toString("base64");

  const getFileShaIfExists = async (
    sdk: Octokit,
    owner: string,
    repo: string,
    path: string
  ) => {
    try {
      const file = await sdk.rest.repos.getContent({
        owner: owner,
        repo: repo,
        path: path,
        branch: branch,
      });
      const { sha } = file.data as any;
      return sha;
    } catch (e) {
      return;
    }
  };

  // If the file already exists, you need to provide the sha in order to update the file content.
  const file_sha = await getFileShaIfExists(octokit, owner, repo, path);

  return octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
    owner: owner,
    repo: repo,
    path: path,
    message: "Updated by Jungoler",
    committer: {
      name: "Oein",
      email: "oein0219@gmail.com",
    },
    content: cnt,
    sha: file_sha,
    branch: branch,
  });
}
