const assert = require('assert');
const test = require('@nlib/test');
const {ContentType} = require('../..');

test('ContentType', (test) => {

	test('ContentType.prototype.get', (test) => {
		const tests = [
			['foo/bar.txt', 'text/plain'],
			['foo/bar.dat', 'text/plain'],
			['foo/bar.log', 'text/plain'],
			['foo/bar.html.log', 'text/plain'],
			['foo/bar.html', 'text/html'],
			['foo/bar.htm', 'text/html'],
			['foo/bar.htm.css', 'text/css'],
			['foo/bar.htm.css.js', 'application/javascript'],
			['foo/bar.htm.css.json', 'application/json'],
			['foo/bar.htm.css.jpg', 'image/jpeg'],
			['foo/bar.htm.css.jpeg', 'image/jpeg'],
			['foo/bar.htm.css.png', 'image/png'],
			['foo/bar.htm.css.gif', 'image/gif'],
			['foo/bar.htm.css.svg', 'image/svg+xml'],
			['foo/bar.htm.css.svg.ttf', 'application/x-font-ttf'],
			['foo/bar.htm.css.svg.otf', 'application/x-font-otf'],
			['foo/bar.htm.css.svg.woff', 'application/font-woff'],
			['foo/bar.htm.css.svg.woff.pdf', 'application/pdf'],
			['foo/bar.htm.css.svg.woff.pdf.zip', 'application/zip'],
			['foo/bar.htm.css.svg.woff.pdf.webm', 'video/webm'],
			['foo/bar.htm.css.svg.woff.pdf.mpg', 'video/mpeg'],
			['foo/bar.htm.css.svg.woff.pdf.mpeg', 'video/mpeg'],
			['foo/bar.htm.css.svg.woff.pdf.mp4', 'video/mp4'],
			['foo/bar.htm.css.svg.woff.pdf.ogg', 'audio/ogg'],
			['foo/bar.htm.css.svg.woff.pdf.wav', 'audio/wav'],
			['foo/bar.htm.css.svg.woff.pdf.mp3', 'audio/mpeg'],
			['foo/bar.htm.css.svg.woff.pdf.m4a', 'audio/aac'],
			['foo/bar.htm.css.svg.woff.pdf.midi', 'audio/midi'],
		];

		for (const [filePath, expected] of tests) {
			test(`${filePath} → ${expected}`, () => {
				const contentType = new ContentType();
				const actual = contentType.get(filePath);
				assert.equal(actual, expected);
			});
		}

	});

	test('ContentType.prototype.getExtname', (test) => {

		const tests = [
			['text/plain', '.txt'],
			['text/html', '.html'],
			['text/css', '.css'],
			['application/javascript', '.js'],
			['application/json', '.json'],
			['image/jpeg', '.jpg'],
			['image/png', '.png'],
			['image/gif', '.gif'],
			['image/svg+xml', '.svg'],
			['application/x-font-ttf', '.ttf'],
			['application/x-font-otf', '.otf'],
			['application/font-woff', '.woff'],
			['application/pdf', '.pdf'],
			['application/zip', '.zip'],
			['video/webm', '.webm'],
			['video/mpeg', '.mpg'],
			['video/mp4', '.mp4'],
			['audio/ogg', '.ogg'],
			['audio/wav', '.wav'],
			['audio/mpeg', '.mp3'],
			['audio/aac', '.m4a'],
			['audio/midi', '.midi'],
		];

		for (const [type, expected] of tests) {
			test(`${type} → ${expected}`, () => {
				const contentType = new ContentType();
				const actual = contentType.getExtname(type);
				assert.equal(actual, expected);
			});
		}

	});

	test('ContentType.prototype.set', (test) => {

		const newContentType = `type/${Date.now()}`;
		const newExtensions = [`${Date.now()}`, 'html', 'jpg'];

		test('constructor: array', (test) => {
			const contentType = new ContentType([
				[newContentType, newExtensions],
			]);
			for (const extname of newExtensions) {
				test(`get("foo/bar.${extname}") → ${newContentType}`, () => {
					assert.equal(contentType.get(`foo/bar.${extname}`), newContentType);
				});
			}
			test('getExtname', () => {
				const actual = contentType.getExtname(newContentType);
				const expected = `.${newExtensions[0]}`;
				assert.equal(actual, expected);
			});
		});

		test('constructor: object', (test) => {
			const contentType = new ContentType({
				[newContentType]: newExtensions,
			});
			for (const extname of newExtensions) {
				test(`get("foo/bar.${extname}") → ${newContentType}`, () => {
					assert.equal(contentType.get(`foo/bar.${extname}`), newContentType);
				});
			}
			test('getExtname', () => {
				const actual = contentType.getExtname(newContentType);
				const expected = `.${newExtensions[0]}`;
				assert.equal(actual, expected);
			});
		});

		test('method', (test) => {
			const contentType = new ContentType();
			contentType.set(newContentType, newExtensions);
			for (const extname of newExtensions) {
				test(`get("foo/bar.${extname}") → ${newContentType}`, () => {
					assert.equal(contentType.get(`foo/bar.${extname}`), newContentType);
				});
			}
			test('getExtname', () => {
				const actual = contentType.getExtname(newContentType);
				const expected = `.${newExtensions[0]}`;
				assert.equal(actual, expected);
			});
		});

		test('delete resolver', () => {
			const contentType = new ContentType();
			contentType.set(newContentType, newExtensions);
			const currentLength = contentType.length;
			contentType.set(`${newContentType}-new`, newExtensions);
			assert.equal(contentType.length, currentLength);
		});

	});

	test('ContentType.prototype.defaultContentType', () => {
		const contentType = new ContentType();
		const expected = `unknown/${Date.now()}`;
		contentType.defaultContentType = expected;
		const actual = contentType.get('foo');
		assert.equal(actual, expected);
	});

	test('ContentType.prototype.defaultExtname', () => {
		const contentType = new ContentType();
		const expected = `.${Date.now()}`;
		contentType.defaultExtname = expected.slice(1);
		const actual = contentType.getExtname('foo');
		assert.equal(actual, expected);
	});

	test('filter type string', () => {
		const contentType = new ContentType();
		const newContentType = `type/${Date.now()}`;
		const newExtensions = [`${Date.now()}`, `${Date.now() + 1}`];
		contentType.set(
			` ${newContentType}  ; charset=utf-8`,
			newExtensions
			.map((extension) => {
				return `/foo.bar/baz.baz.${extension}`;
			})
		);
		assert.deepEqual(contentType[0], [newContentType, newExtensions]);
	});

});
