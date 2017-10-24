import keyMirror from 'keymirror';

export const buttonsState = {
	CHANGING: 'CHANGING',
	DELETING: 'CONFIRM'
}

export default keyMirror({
	LOAD_NOTES_REQUEST: null,
	LOAD_NOTES_SUCCESS: null,
	LOAD_NOTES_FAIL: null
});
