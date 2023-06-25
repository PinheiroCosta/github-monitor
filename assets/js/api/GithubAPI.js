import axios from 'axios';


const githubApiBaseUrl = 'https://api.github.com';

// ------------------ TODO refatorar:  -----------------------
//  1. validações de requisição
//  2. funções utilitarias
//  --------------------------------------------------------
const getHeaders = (accessToken) => {
  return {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${accessToken}`,
  };
};

function pastMonth() {
  const today = new Date();
  const thirtyPastDays = new Date(today);
  thirtyPastDays.setDate(today.getDate() - 30);

  return thirtyPastDays;
}

const getGithubToken = () => {
  return axios
    .get('github-token/')
    .then((response) => {
      const {data} = response;
      const {github_token} = data;
      return github_token;
    }).catch((error) => {
      console.error("Error: couldn't get GitHub token:", error);
      return;
    })
};

export const mapCommitsData = (repository, responseData) => {
  return responseData.map((commit) => {
    const {sha, author, html_url, commit: {message, author: {name, date}}} = commit;
    return {
      sha,
      author: name,
      url: html_url,
      avatar: author.avatar_url,
      message,
      date,
      repository: repository,
    };
  });
}
// -----------------------------------------------------------------------------
export const getGithubCommits = (owner, repo, dispatch) => {
  return getGithubToken()
    .then((accessToken) => {
      if (accessToken) {
        const thirtyDaysAgo = pastMonth();
        return axios
          .get(`${githubApiBaseUrl}/repos/${owner}/${repo}/commits`, {
            headers: getHeaders(accessToken),
            params:{since: thirtyDaysAgo.toISOString(),}
          });
      } else {
        throw new Error('GitHub AccessToken not available');
      }})
    .then((response) => {
        const {data} = response;
        const commits = mapCommitsData(repo, data); 
        if (commits) {
          return response;
        }
      })
      .catch((error) => {
        return error.response;
      });
};

