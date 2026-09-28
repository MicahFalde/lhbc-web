# lincolnhighwaybaptist.org

The website of Lincoln Highway Baptist Church (Dalton, Ohio), served by GitHub Pages on the custom
domain `lincolnhighwaybaptist.org` (`lhbcohio.org` 301-redirects here and is the church's email domain).

**Built output only. Do not edit here.** The source is the private repo `MicahFalde/lhbc-website`
(`~/projects/lhbc-website`); `tools/deploy.sh` there builds the site and syncs it into this repo.

While the site is in preview, every page is encrypted behind a password gate (AES-256-GCM; the key
comes from the password in the browser, so neither the pages nor the password are readable in this
repo). Assets under `/assets/` are served in the clear. Un-gating is a deploy without the password.
