import { gitmojis } from "gitmojis";

const getEmojisBySemVer = (releaseType) =>
  gitmojis.filter((e) => e.semver === releaseType).map((e) => e.code);

module.exports = {
  branch: "master",
  plugins: [
    "@semantic-release/npm",
    "@semantic-release/changelog",
    [
      "semantic-release-gitmoji",
      {
        releaseRules: {
          major: getEmojisBySemVer("major"),
          minor: getEmojisBySemVer("minor"),
          patch: getEmojisBySemVer("patch"),
        },
        releaseNotes: {
          issueResolution: {
            template: "{baseUrl}/{owner}/{repo}/issues/{ref}",
            baseUrl: "https://github.com",
            source: "github.com",
            removeFromCommit: false,
            regex: /#\d+/g,
          },
        },
      },
    ],
    [
      "@semantic-release/exec",
      {
        prepareCmd:
          "NEW_VERSION=${nextRelease.version} task build release-beta",
      },
    ],
    [
      "@semantic-release/github",
      {
        assets: [
          {
            path: "dist/**",
          },
        ],
      },
    ],
    [
      "@semantic-release/git",
      {
        message:
          ":bookmark: ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
        assets: [
          "CHANGELOG.md",
          "manifest.json",
          "manifest-beta.json",
          "versions.json",
          "package.json",
          "package-lock.json",
        ],
      },
    ],
  ],
};
