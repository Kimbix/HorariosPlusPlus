interface Class {
	startHour: number
	startMinute: number
	endHour: number
	endMinute: number
	day: number
}

interface Section {
	code: string
	teacher: string
	classes: Class[]
	visible: boolean
}

interface Course {
	color: string
	name: string
	sections: Section[]
	visible: boolean
}

interface ScheduleSection {
	courseName: string
	color: string
	code: string
	teacher: string
	classes: Class[]
}

export { Class, Section, Course, ScheduleSection }

