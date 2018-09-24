var gulp  = require('gulp');
var shell = require('gulp-shell');

gulp.task('default', [ 'deploy' ]);
gulp.task('deploy', [ 'build', 'push']);

gulp.task('push',
  shell.task(
    "git push origin master",
    { verbose: true }
  )
);

gulp.task("install", shell.task(
      'gitbook install;'
));

gulp.task('build', shell.task([
      'gitbook build;'+
      'rm -fR docs/*;'+
      'mv _book/* docs/;'+
      'git add docs;'+
      "git ci -am 'deploy to github';"
    ],
    { verbose: true }
));

// "serve": "gitbook serve docs",
gulp.task('serve', shell.task(
    ['gitbook serve --lrport 9999 --port 43210 `pwd` docs']
  )
);


// open browser
gulp.task('open1718', function() {
  return gulp.src('').pipe(shell(['open https://ull-esit-mii-ca-1718.github.io/docs/']));
});

// open browser
gulp.task('opengh', function() {
  return gulp.src('').pipe(shell(['open https://ull-mii-ca-1819.github.io/']));
});

// open browser at local
gulp.task('open', function() {
  return gulp.src('').pipe(shell(['open localhost:4000']));
});
