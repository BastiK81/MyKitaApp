import {mockImgAvatar} from '../utils/mockImages';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
    id: '1',
    avatarUrl: mockImgAvatar(index + 1),
    name: 'Sebastian',
    company: 'EON',
    isVerified: true,
    status: 'active',
    role: 'Leader'
    // 'Hr Manager',
    // 'UI Designer',
    // 'UX Designer',
    // 'UI/UX Designer',
    // 'Project Manager',
    // 'Backend Developer',
    // 'Full Stack Designer',
    // 'Front End Developer',
    // 'Full Stack Developer'
}));

export default users;
