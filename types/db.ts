export interface Student {
  id: string;
  username: string;
  email: string;
  role: 'STUDENT';
  student: StudentInfo;
  lecturer: null;
  admin: null;
  accountStatus: 'ACTIVE' | 'BANNED';
}

export interface Lecturer {
  id: string;
  username: string;
  email: string;
  role: 'LECTURER';
  student: null;
  lecturer: LecturerInfo;
  admin: null;
  accountStatus: 'ACTIVE' | 'BANNED';
}

interface LecturerInfo {
  id: number;
  userId: string;
  profile: Profile;
  lecturerCode: string;
  department: string;
  officeLocation: string;
  yearsOfExperience: number;
}

interface StudentInfo {
  id: number;
  userId: string;
  profile: Profile;
  studentCode: string;
  major: string;
  className: string;
  yearOfAdmission: number;
}

interface Profile {
  id: number;
  nickName: string;
  tagName: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  bio: string | null;
  avatarUrl: string;
  userId: string;
  coverImageUrl: string | null;
  informationDetail: InformationDetail;
  isPrivate: boolean;
  contact: Contact;
  skills: string[];
  followerCount: number;
  followingCount: number;
}

interface InformationDetail {
  id: number;
  fullName: string | null;
  work: string | null;
  currentCity: string | null;
  homeTown: string | null;
}

interface Contact {
  id: number;
  email: string;
  phoneNumber: string;
  address: string;
}

interface Admin {}
