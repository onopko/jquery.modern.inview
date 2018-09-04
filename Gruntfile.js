module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON("package.json"),

		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Author: <%= pkg.author.name %>\n" +
				" *\n" +
				" *  Forked from: Protonet (https://github.com/protonet/jquery.inview/)\n" +
				" *  Based on the idea of: Remy Sharp (http://remysharp.com/2009/01/26/element-in-view-event-plugin/)\n" +
				" *\n" +
				" *  Under <%= pkg.license %> License\n" +
				" */\n"
		},

		concat: {
            files: {
                src : 'src/*.js',
                dest: 'dist/jquery.modern.inview.js'
            },
			options: {
				banner: "<%= meta.banner %>"
			}
        },

        uglify: {
            dist: {
                files: {
                    'dist/jquery.modern.inview.min.js': 'dist/jquery.modern.inview.js'
                }
            }
        },

		jshint: {
			files: ["src/jquery.modern.inview.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("build", ["concat", "uglify"]);
	grunt.registerTask("default", ["jshint", "build"]);
	grunt.registerTask("travis", ["default"]);

};
