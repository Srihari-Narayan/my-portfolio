// Valid flag hashes (SHA-256)
export const validFlagHashes = [
    'd8d0717565634fa5ccca41fdec2d834d385d538ec5929052324e413ae911693e', // Flag 1
    'f94efe5e52272d3ac586630ce056c86698b78c7d95150acd695e7d37ed30e11b', // Flag 2
    '385fba051ba1ddee81001373f562e7121a4ac7d5da5adc6d0318caf582be6ab1', // Flag 3
    '4deaa1d9febd66ef41f5dbcf726d33be4b351abed966806ecfa1258539b78a13', // Flag 4
    '3487251e4196e918654cadba8b9e662c983b4184c371e19a3a4bd536670ffa50'  // Flag 5
];

// SHA-256 hash function
export async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Get submitted flags from localStorage
export function getSubmittedFlags() {
    return JSON.parse(localStorage.getItem('submittedFlags') || '[]');
}

// Save submitted flags to localStorage
export function saveSubmittedFlags(flags) {
    localStorage.setItem('submittedFlags', JSON.stringify(flags));
}

// Check if flag is valid
export async function validateFlag(input) {
    const inputHash = await sha256(input);
    return validFlagHashes.includes(inputHash);
}

// Check if flag was already submitted
export function isFlagSubmitted(flagHash) {
    const submittedFlags = getSubmittedFlags();
    return submittedFlags.includes(flagHash);
}
