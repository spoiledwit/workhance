type User = {
    _id?: string;
    name: string;
    email: string;
    profilePicture?: string;
    posts?: string[]
    bio?: string;
    educations?: any[];
    workExperiences?: any[];
    followers: string[];
    conversations?: string[];
    recommendations?: string[];
    employerId?: string;
    employeeId?: string;
    isBlocked?: boolean;
    createdAt?: string;
    updatedAt?: string;
    hashedPassword?: string;
    verificationStatus?: string;
    isAdmin?: boolean;
};


type Post = {
    _id?: string;
    caption: string;
    images?: string[];
    video?: string;
    likes?: string[];
    comments?: string[];
    authorId?: string;
    createdAt?: string;
    updatedAt?: string;
};

type Comment = {
    _id?: string;
    content: string;
    likes?: string[];
    userId: string;
    postId: string;
    createdAt?: string;
    updatedAt?: string;
};

type Recommendation = {
    _id?: string;
    content: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
};

type Conversation = {
    _id?: string;
    members: string[];
    createdAt?: string;
    updatedAt?: string;
};

type Message = {
    _id?: string;
    conversationId: string;
    senderId: string;
    content: string;
    isRead: boolean;
    createdAt?: string;
    updatedAt?: string;
};

type Employer = {
    _id?: string;
    userId: string;
    isVerified: boolean;
    postedJobs: string[];
    companyName: string;
    businessEmail: string;
    companyWebsite?: string;
    isDisabled: boolean;
    createdAt: string;
    updatedAt: string;
};

type Employee = {
    _id?: string;
    userId: string;
    isVerified: boolean;
    address: string;
    desiredJobTitles: string[];
    cv: string;
    educations: string[];
    workExperiences: string[];
    skills?: string[];
    isDisabled: boolean;
    createdAt: string;
    updatedAt: string;
}

type SupportTicket = {
    _id?: string;
    userId: string;
    content: string;
    isResolved: boolean;
    createdAt: string;
    updatedAt: string;
}

type Job = {
    _id?: string;
    companyInfoId: string;
    employerId: string;
    jobTitle: string;
    jobDescription: string;
    jobType: string;
    advertisingLocation: string;
    salary: {
        exactAmount?: number;
        range?: {
            min: number;
            max: number;
        },
        startingAmount?: number;
        maxAmount?: number;
    },
    updatesEmail: string;
    requireCv: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
}

type CompanyInfo = {
    _id?: string;
    employerId: string;
    name: string;
    email: string;
    website?: string;
    logo?: string;
    employeeCount: number;
    createdAt: string;
    updatedAt: string;
}

type JobDetail = {

    salary?: {
        min?: number,
        max?: number
    },
    _id?: string,
    companyInfo: {
        name: string,
        email: string,
        website?: string,
        logo: string,
        employeeCount: string,
        _id: string,
        createdAt: string,
        updatedAt: string
    },
    employerId: string,
    jobTitle: string,
    jobDescription: string,
    jobType: string,
    advertisingLocation?: string,
    updatesEmail?: string,
    requireCv: boolean,
    applications?: String[],
    shortlisted?: String[],
    status?: string,
    updatedAt: string,
    createdAt: string,
    __v: Number
}

type Candidate = {
    applicant: User,
    job: JobDetail,
    cv: string,
    id: string
}

type EducationInfo = {
    school: string,
    degree: string,
    endYear: string,
    grade: string,
    isCurrent: boolean,
    startYear: string,
    _id: string,
    description: string,
    fieldOfStudy: string
}

type WorkExperience = {
    company: string,
    endYear: string,
    isCurrent: boolean,
    startYear: string,
    _id: string,
    description: string,
    position: string,
}

export type { User, Post, Comment, Recommendation, Conversation, Message, Employer, Employee, SupportTicket, Job, CompanyInfo, JobDetail, Candidate, EducationInfo, WorkExperience };