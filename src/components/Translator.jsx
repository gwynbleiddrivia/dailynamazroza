import Dictionary from './Dictionary.json'
const Translator = (thingsToTranslate) => {
	const pattern = /\d|AM|PM|Saturday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|January|February|March|April|May|June|July|August|September|October|November|December/g

	return thingsToTranslate.replace(pattern, (match) => Dictionary[match])
};

export default Translator;
