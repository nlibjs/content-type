module.exports = class ContentType extends Map {

	static filterContentType(string) {
		return string.split(/\s*;/).shift().trim().toLowerCase();
	}

	static filterExtname(string) {
		return string.split('.').pop().trim().toLowerCase();
	}

	constructor(arg) {
		super([
			['text/html', ['html', 'htm']],
			['text/css', ['css']],
			['application/javascript', ['js']],
			['application/json', ['json']],
			['image/jpeg', ['jpg', 'jpeg']],
			['image/png', ['png']],
			['image/gif', ['gif']],
			['image/svg+xml', ['svg']],
			['image/vnd.microsoft.icon', ['ico']],
			['application/x-font-ttf', ['ttf']],
			['application/x-font-otf', ['otf']],
			['application/font-woff', ['woff']],
			['application/pdf', ['pdf']],
			['application/zip', ['zip']],
			['video/webm', ['webm']],
			['video/mpeg', ['mpg', 'mpeg']],
			['video/mp4', ['mp4']],
			['audio/ogg', ['ogg']],
			['audio/wav', ['wav']],
			['audio/mpeg', ['mp3']],
			['audio/aac', ['m4a']],
			['audio/midi', ['midi']],
		]);
		if (arg) {
			if (arg[Symbol.iterator]) {
				for (const [type, extnames] of arg) {
					this.set(type, extnames);
				}
			} else {
				for (const type of Object.keys(arg)) {
					this.set(type, arg[type]);
				}
			}
		}
		this.setDefault('text/plain', ['txt', 'dat', 'log']);
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
