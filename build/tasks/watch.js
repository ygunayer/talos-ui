"use strict";


var config = require("../config"),
	gulp = require("gulp");

gulp.task("watch", function() {
	gulp.watch(config.scripts.src, [ "scripts" ]);
	gulp.watch(config.styles.src, [ "styles" ]);
	gulp.watch(config.views.src, [ "views" ]);
	gulp.watch(config.fonts.src, [ "fonts" ]);
	gulp.watch(config.views.entry, [ "views" ]);
});
