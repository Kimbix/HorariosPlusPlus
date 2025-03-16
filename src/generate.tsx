import { Section, Course, ScheduleSection } from "./interfaces.tsx";

function GenerateSchedules(courses: Course[], total: ScheduleSection[][], current: ScheduleSection[], index: number): ScheduleSection[][] | undefined {
	if (courses.length === current.length) {
		total.push(current);
		return total;
	}

	for (const section of courses[index].sections) {
		if (!canFit(section, current)) continue;
		console.log(courses[index].color)
		GenerateSchedules(courses, total, current.concat({ color: courses[index].color, courseName: courses[index].name, ...section }), index + 1)
	}

	return total;
}

function canFit(section: Section, sectionList: ScheduleSection[]): boolean {
	for (const c of section.classes)
		if (c.startHour * 60 + c.startMinute >= c.endHour * 60 + c.endMinute)
			return false

	for (const classf of section.classes) {
		for (const currentSection of sectionList) {
			for (const currentClass of currentSection.classes) {
				if (classf.day !== currentClass.day)
					continue

				if ((classf.startHour * 60 + classf.startMinute) >= (currentClass.startHour * 60 + currentClass.startMinute) &&
					(classf.startHour * 60 + classf.startMinute) < (currentClass.endHour * 60 + currentClass.endMinute)) {
					return false
				}

				if ((classf.endHour * 60 + classf.endMinute) > (currentClass.startHour * 60 + currentClass.startMinute) &&
					(classf.endHour * 60 + classf.endMinute) <= (currentClass.endHour * 60 + currentClass.endMinute)) {
					return false
				}
			}
		}
	}
	return true
}

export default GenerateSchedules;
