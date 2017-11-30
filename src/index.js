module.exports = class ContentType extends Map {

	static filterContentType(string) {
		return string.split(/\s*;/).shift().trim().toLowerCase();
	}

	static filterExtname(string) {
		return string.split('.').pop().trim().toLowerCase();
	}

	constructor() {
		super();
		this.setDefault('text/plain', ['txt', 'dat', 'log']);
		this.set('text/html', ['html', 'htm']);
		this.set('text/css', ['css']);
		this.set('application/javascript', ['js']);
		this.set('application/json', ['json']);
		this.set('image/jpeg', ['jpg', 'jpeg']);
		this.set('image/png', ['png']);
		this.set('image/gif', ['gif']);
		this.set('image/svg+xml', ['svg']);
		this.set('image/vnd.microsoft.icon', ['ico']);
		this.set('application/x-font-ttf', ['ttf']);
		this.set('application/x-font-otf', ['otf']);
		this.set('application/font-woff', ['woff']);
		this.set('application/pdf', ['pdf']);
		this.set('application/zip', ['zip']);
		this.set('video/webm', ['webm']);
		this.set('video/mpeg', ['mpg', 'mpeg']);
		this.set('video/mp4', ['mp4']);
		this.set('audio/ogg', ['ogg']);
		this.set('audio/wav', ['wav']);
		this.set('audio/mpeg', ['mp3']);
		this.set('audio/aac', ['m4a']);
		this.set('audio/midi', ['midi']);
	}

	set(contentType, extnameList) {
		super.set(
			ContentType.filterContentType(contentType),
			extnameList.map(ContentType.filterExtname)
		);
	}

	setDefault(contentType, extnameList) {
		this.set(contentType, extnameList);
		this.defaultContentType = contentType;
		[this.defaultExtname] = extnameList;
	}

	get(filePath) {
		const extname = ContentType.filterExtname(filePath);
		for (const [contentType, extnameList] of this) {
			if (extnameList.includes(extname)) {
				return contentType;
			}
		}
		return this.defaultContentType;
	}

	$get(...args) {
		return super.get(...args);
	}

	getExtname(contentType) {
		contentType = ContentType.filterContentType(contentType);
		const extname = this.has(contentType) ? super.get(contentType)[0] : this.defaultExtname;
		return `.${extname}`;
	}

};
