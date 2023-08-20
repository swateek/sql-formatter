# Development

## Setup

Run `yarn` after checkout to install all dependencies.

## Tests

Tests can be run with `yarn test`.

Please add new tests for any new features and bug fixes.
Language-specific tests should be included in their respective `sqldialect.test.ts` files.
Tests that apply to all languages should be in `behavesLikeSqlFormatter.ts`.

## Publish Flow

For those who have admin access on the repo, the new release publish flow is as such:

- `npm run release` (bumps version, git tag, git release, npm release) (does not work with `yarn`).
- `git subtree push --prefix static origin gh-pages` (pushes demo page to GH pages)

## Contributors

- Adrien Pyke <adpyke@gmail.com>
- Ahmad Khan <ahmad.khan@educative.io>
- Alexandr Kozhevnikov <aedkozhevnikov@sberbank.ru>
- Alexander Prinzhorn <alexander@prinzhorn.it>
- An Phi <aphi@skidmore.edu>
- Andrew
- Benjamin Bellamy
- bingou
- Boris Verkhovskiy <boris.verk@gmail.com>
- Damon Davison <ddavison@avalere.com>
- Davut Can Abacigil <can@teamsql.io>
- Erik Hirmo <erik.hirmo@roguewave.com>
- George Leslie-Waksman <waksman@gmail.com>
- Grant Forsythe <grantwforsythe@gmail.com>
- htaketani <h.taketani@gmail.com>
- Ian Campbell <icampbell@immuta.com>
- ivan baktsheev
- Jacobo Bouzas Quiroga <jacobo.bouzas@factorial.co>
- João Pimentel Ferreira
- Justin Dane Vallar <jdvallar@gmail.com>
- Martin Nowak <code@dawg.eu>
- Matheus Salmi <mathsalmi@gmail.com>
- Matheus Teixeira <matheus.mtxr@gmail.com>
- Michael Giannakopoulos <mgiannakopoulos@singlestore.com>
- Nathan Walters <nwalters512@gmail.com>
- Nicolas Dermine <nicolas.dermine@gmail.com>
- Offir Baron <ofir@panoply.io>
- Olexandr Sydorchuk <olexandr.syd@gmail.com>
- Pavel Djundik <xPaw@users.noreply.github.com>
- pokutuna <mail@pokutuna.com>
- Rafael Pinto <raprp@posteo.de>
- Rahel Rjadnev-Meristo <rahelini@gmail.com>
- Rene Saarsoo <nene@triin.net>
- Rodrigo Stuchi
- Romain Rigaux <hello@getromain.com>
- Sasha Aliashkevich <olsender@gmail.com>
- Sean Song <mail@seansong.dev>
- Sebastian Lyng Johansen <seblyng98@gmail.com>
- Sergei Egorov <sergei.egorov@zeroturnaround.com>
- Stanislav Germanovskii <s.germanovskiy@tinkoff.ru>
- Steven Yung <stevenyung@fastmail.com>
- Tito Griné <tgrine@singlestore.com>
- Toliver <teejae@gmail.com>
- Toni Müller <toni.mueller@datameer.com>
- Tyler Jones <tyler.jones@txwormhole.com>
- Uku Pattak <ukupat@gmail.com>
- Xin Hu <hoosin.git@gmail.com>
