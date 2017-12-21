module.exports = class ContentType extends Array {

	static filterContentType(string) {
		return string.split(/\s*;/).shift().trim().toLowerCase();
	}

	static filterExtname(string) {
		return string.split('.').pop().trim().toLowerCase();
	}

	constructor(arg) {
		super();
		const defaults = [
			['text/html', ['html', 'htm']],
			['application/javascript', ['js']],
			['text/css', ['css']],
			['application/json', ['json']],
			['image/jpeg', ['jpg', 'jpeg']],
			['image/png', ['png']],
			['image/gif', ['gif']],
			['image/svg+xml', ['svg']],
			['image/vnd.microsoft.icon', ['ico']],
			['application/font-woff', ['woff']],
			['application/x-font-otf', ['otf']],
			['application/x-font-ttf', ['ttf']],
			['application/pdf', ['pdf']],
			['application/zip', ['zip']],
			['video/webm', ['webm']],
			['video/mpeg', ['mpg', 'mpeg']],
			['video/mp4', ['mp4']],
			['audio/mpeg', ['mp3']],
			['audio/wav', ['wav']],
			['audio/ogg', ['ogg']],
			['audio/aac', ['m4a']],
			['audio/midi', ['midi']],
		];
		for (let i = defaults.length; i--;) {
			this.set(...defaults[i]);
		}
		if (arg) {
			if (arg[Symbol.iterator]) {
				for (const entry of arg) {
					this.set(...entry);
				}
			} else {
				for (const type of Object.keys(arg)) {
					this.set(type, arg[type]);
				}
			}
		}
		this.setDefault('text/plain', ['txt', 'dat', 'log']);
	}

	get default() {
		return [this.defaultContentType, [this.defaultExtname]];
	}

	set(contentType, extnameList) {
		contentType = ContentType.filterContentType(contentType);
		extnameList = Array.from(extnameList).map(ContentType.filterExtname);
		for (const extname of extnameList) {
			const index = this.findIndex(([, extnames]) => extnames.includes(extname));
			if (0 <= index) {
				const [, exts] = this[index];
				exts.splice(exts.indexOf(extname), 1);
				if (exts.length === 0) {
					this.splice(index, 1);
				}
			}
		}
		this.unshift([contentType, extnameList]);
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
		return this.default[0];
	}

	getExtname(contentType) {
		contentType = ContentType.filterContentType(contentType);
		const [, [extname]] = this.find(([type]) => type === contentType) || this.default;
		return `.${extname}`;
	}

};
