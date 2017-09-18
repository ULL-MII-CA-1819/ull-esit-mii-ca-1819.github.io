var gulp  = require('gulp');
var shell = require('gulp-shell');

var deploygh = function() {
  "use strict";
  let gh = require('gh-pages');

  let json = require('./package.json');
  let REPO = json.repository.url;
  console.log(REPO);

  gh.publish('./gh-pages', { repo: REPO, logger: function(m) { console.error(m); } });
}

//  "deploy-gitbook": "./scripts/losh deploy-gitbook",
gulp.task('deploy', [ 'build', 'push']);

//  "deploy-togbsio": "./scripts/losh deploy-togbsio",
gulp.task('deploygb',
  shell.task(
    "git ci -am 'deploy to gitbooks'"+
    ";"+
    "git push gbs master",
    { verbose: true }
  )
);

gulp.task('push',
  shell.task(
    "git add docs"+
    ";"+
    "git ci -am 'deploy to github'"+
    ";"+
    "git push origin master",
    { verbose: true }
  )
);

gulp.task('build', shell.task([
      'gitbook build', 
      'rm -fR docs',
      'mv _book docs'],
      { verbose: true }
));

// "serve": "gitbook serve txt gh-pages",
gulp.task('serve', shell.task(
    ['gitbook serve --lrport 9999 --port 43210 `pwd` docs']
  )
);


// open browser 
gulp.task('opengh', function() {
  return gulp.src('').pipe(shell(['open https://ull-esit-mii-ca-1718.github.io/docs/']));
});

// open browser at local
gulp.task('open', function() {
  return gulp.src('').pipe(shell(['open localhost:4000']));
});

