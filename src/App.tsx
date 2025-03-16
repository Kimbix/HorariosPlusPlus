import './App.css';
import React from "react";

import GenerateSchedules from './generate.tsx';
import { Class, Section, Course, ScheduleSection } from './interfaces.tsx';

// @ts-ignore
import edit_icon from "./svg/edit-icon.svg";
// @ts-ignore
import dropdown_icon from "./svg/dropdown-icon.svg";
// @ts-ignore
import trash_icon from "./svg/trash-icon.svg";
// @ts-ignore
import eye_icon from "./svg/eye-icon.svg";


function ClassComp({ visible, clasObject, removeCallback }: { visible: boolean, clasObject: Class, removeCallback: Function }) {
	const minHour = 7
	const maxHour = 22

	const [clas, setClas] = React.useState(clasObject);

	const isValid = (): boolean => clasObject.startHour * 60 + clasObject.startMinute < clasObject.endHour * 60 + clasObject.endMinute

	function startHourEdit(val: String) {
		if (isNaN(Number(val))) return
		if (val.length > 2) return

		const newClas: Class = { ...clasObject };
		clasObject.startHour = Number(val)
		newClas.startHour = Number(val)
		setClas(newClas)
	}

	function startHourValidate(val: String) {
		const num = Math.min(Math.max(Number(val), minHour), maxHour - 1)
		const newClas: Class = { ...clasObject };
		clasObject.startHour = num
		newClas.startHour = num
		setClas(newClas)
	}

	function startMinuteEdit(val: String) {
		if (isNaN(Number(val))) return
		if (val.length > 2) return

		const newClas: Class = { ...clasObject };
		clasObject.startMinute = Number(val)
		newClas.startMinute = Number(val)
		setClas(newClas)
	}

	function startMinuteValidate(val: String) {
		const num = Math.min(Math.max(Number(val), 0), clasObject.startHour === maxHour ? 0 : 55)
		const newClas: Class = { ...clasObject };
		clasObject.startMinute = Math.floor(num / 5) * 5
		newClas.startMinute = Math.floor(num / 5) * 5
		setClas(newClas)
	}

	function endHourEdit(val: String) {
		if (isNaN(Number(val))) return
		if (val.length > 2) return

		const newClas: Class = { ...clasObject };
		clasObject.endHour = Number(val)
		newClas.endHour = Number(val)
		setClas(newClas)
	}

	function endHourValidate(val: String) {
		const num = Math.min(Math.max(Number(val), clasObject.startHour), maxHour)
		const newClas: Class = { ...clasObject };
		clasObject.endHour = num
		newClas.endHour = num
		setClas(newClas)
	}

	function endMinuteEdit(val: String) {
		if (isNaN(Number(val))) return
		if (val.length > 2) return

		const newClas: Class = { ...clasObject };
		clasObject.endMinute = Number(val)
		newClas.endMinute = Number(val)
		setClas(newClas)
	}

	function endMinuteValidate(val: String) {
		const num = Math.min(Math.max(Number(val), 0), clasObject.endHour === maxHour ? 0 : 55)
		const newClas: Class = { ...clasObject };
		clasObject.endMinute = Math.floor(num / 5) * 5
		newClas.endMinute = Math.floor(num / 5) * 5
		setClas(newClas)
	}

	function dayEdit(val: String) {
		const num = Number(val)
		const newClas: Class = { ...clasObject };
		clasObject.day = num
		newClas.day = num
		setClas(newClas)
	}

	function dayValidate(val: String) {
		const num = Math.min(Math.max(Number(val), 1), 7)
		const newClas: Class = { ...clasObject };
		clasObject.day = num
		newClas.day = num
		setClas(newClas)
	}


	return <div className={`${visible || "not-used-class"} ${isValid() || "invalid-class"} floating-container background-analogous-3 flex-space-around left-right-flex gap-10`}>
		<div className="left-right-flex write-container">
			<input value={clas.day} onBlur={e => dayValidate(e.target.value)} onChange={e => dayEdit(e.target.value)} className="max-size-75 write-input" placeholder="Day" />
			<img className="svg-icon" width="16px" src={dropdown_icon} />
		</div>
		<div className="left-right-flex write-container">
			<input value={clas.startHour} onBlur={e => startHourValidate(e.target.value)} onChange={e => startHourEdit(e.target.value)} className="max-size-25 write-input" placeholder="HH" />
			<input value={clas.startMinute} onBlur={e => startMinuteValidate(e.target.value)} onChange={e => startMinuteEdit(e.target.value)} className="max-size-25 write-input" placeholder="MM" />
			<img className="svg-icon" width="16px" src={dropdown_icon} />
		</div>
		<div className="left-right-flex write-container">
			<input value={clas.endHour} onBlur={e => endHourValidate(e.target.value)} onChange={e => endHourEdit(e.target.value)} className="max-size-25 write-input" placeholder="HH" />
			<input value={clas.endMinute} onBlur={e => endMinuteValidate(e.target.value)} onChange={e => endMinuteEdit(e.target.value)} className="max-size-25 write-input" placeholder="MM" />
			<img className="svg-icon" width="16px" src={dropdown_icon} />
		</div>
		<button className="remove-button" onClick={removeCallback} >
			<img className="svg-icon" width="16px" src={trash_icon} />
		</button>
	</div >
}

function SectionComp({ visibleOverride, sectionObject, removeCallback }: { visibleOverride: boolean, sectionObject: Section, removeCallback: Function }) {
	const [section, setSection] = React.useState(sectionObject);

	function codeEdit(val: string) {
		const newSection: Section = { ...sectionObject };
		sectionObject.code = val
		newSection.code = val
		setSection(newSection)
	}

	function teacherEdit(val: string) {
		const newSection: Section = { ...sectionObject };
		sectionObject.teacher = val
		newSection.teacher = val
		setSection(newSection)
	}

	function classAdd() {
		const newSection: Section = { ...sectionObject };
		sectionObject.classes.push({ startHour: 0, startMinute: 0, endHour: 0, endMinute: 0, day: 1 })
		newSection.classes = sectionObject.classes
		setSection(newSection)
	}

	function classRemove(clas: Class) {
		const newSection: Section = { ...sectionObject };
		sectionObject.classes.splice(sectionObject.classes.findIndex(v => v === clas), 1)
		newSection.classes = sectionObject.classes
		setSection(newSection)
	}

	function visibleToggle() {
		if (visibleOverride == false) return;
		const newSection: Section = { ...sectionObject };
		sectionObject.visible = !sectionObject.visible
		newSection.visible = newSection.visible
		setSection(newSection)
	}

	function isVisible() {
		if (visibleOverride == false) return false
		return sectionObject.visible
	}

	return <div className={`${isVisible() || "not-used-section"} up-down-flex background-analogous-2 floating-container gap-10`}>
		<div className="left-right-flex gap-10">
			<div className="write-container min-size-75"><b>Class Code</b></div>
			<div className="flexpand left-right-flex write-container">
				<input value={section.code} onChange={e => codeEdit(e.target.value)} placeholder="Class Code" type="text" className="flexpand write-input" />
				<img className="svg-icon sides-padding" width="16px" src={edit_icon} />
			</div>
			<button className="remove-button" onClick={visibleToggle}>
				<img className="svg-icon" width="16px" src={eye_icon} />
			</button>
		</div>

		<div className="left-right-flex gap-10">
			<div className="write-container min-size-75"><b>Teacher</b></div>
			<div className="flexpand left-right-flex write-container">
				<input value={section.teacher} onChange={e => teacherEdit(e.target.value)} placeholder="Teacher's Name" type="text" className="flexpand write-input" />
				<img className="svg-icon sides-padding" width="16px" src={edit_icon} />
			</div>
			<button className="remove-button" onClick={removeCallback}>
				<img className="svg-icon" width="16px" src={trash_icon} />
			</button>
		</div>

		<div className="up-down-flex gap-10">
			{section.classes.map(c => <ClassComp visible={isVisible()} clasObject={c} removeCallback={_ => classRemove(c)} />)}
		</div>
		<button onClick={classAdd} className="button-analogous-3">+</button>
	</div>
}

function CourseComp({ courseObject, removeCallback }: { courseObject: Course, removeCallback: Function }) {
	const [course, setCourse] = React.useState(courseObject);

	function colorEdit(val: string) {
		const newCourse: Course = { ...courseObject };
		courseObject.color = val
		newCourse.color = val
		setCourse(newCourse)
	}

	function courseNameEdit(val: string) {
		const newCourse: Course = { ...courseObject };
		courseObject.name = val
		newCourse.name = val
		setCourse(newCourse)
	}

	function visibleToggle() {
		const newCourse: Course = { ...courseObject };
		courseObject.visible = !courseObject.visible
		newCourse.visible = newCourse.visible
		setCourse(newCourse)
	}

	function newSection() {
		const newCourse: Course = { ...courseObject };
		courseObject.sections.push({ code: "", teacher: "", classes: [], visible: true })
		newCourse.sections = courseObject.sections
		setCourse(newCourse)
	}

	function sectionRemove(section: Section) {
		const newCourse: Course = { ...courseObject };
		courseObject.sections.splice(courseObject.sections.findIndex(v => v === section), 1)
		newCourse.sections = courseObject.sections
		setCourse(newCourse)
	}

	return <div className={`${courseObject.visible || "not-used-course"} up-down-flex gap-10 background-analogous-1 floating-container`}>
		<div className="left-right-flex gap-10">
			<input value={course.color} onChange={e => colorEdit(e.target.value)} className="color-picker" type="color" />
			<div className="flexpand left-right-flex write-container">
				<input value={course.name} onChange={e => courseNameEdit(e.target.value)} placeholder="Course Name" type="text" className="flexpand write-input strong-input" />
				<img className="svg-icon sides-padding" width="16px" src={edit_icon} />
			</div>
			<button className="remove-button" onClick={visibleToggle}>
				<img className="svg-icon" width="16px" src={eye_icon} />
			</button>
			<button className="remove-button" onClick={removeCallback}>
				<img className="svg-icon" width="16px" src={trash_icon} />
			</button>
		</div>
		<div className="up-down-flex gap-10">
			{course.sections.map(s => <SectionComp visibleOverride={courseObject.visible} sectionObject={s} removeCallback={_ => sectionRemove(s)} />)}
		</div>
		<button onClick={newSection} className="button-analogous-2">+</button>
	</div>
}

function Schedule({ sections }: { sections: ScheduleSection[] }) {
	const nums = ["7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"];
	const days = ["M", "T", "W", "T", "F", "S", "S"]

	function copySectionsList() {
		let res = ""
		for (const s of sections) {
			res = res.concat(s.courseName, " | NRC: ", s.code, " | Teacher: ", s.teacher)
			res = res.concat("\n")
		}
		navigator.clipboard.writeText(res)
	}

	function sectionsOfDay(index: number) {
		const clasesToday: Class[] = []
		const scheduleSections: ScheduleSection[] = []

		for (const s of sections)
			for (const c of s.classes) {
				if (c.day === index + 1) {
					clasesToday.push(c)
					scheduleSections.push(s)
				}
			}

		if (!clasesToday.length)
			return <div style={{ "grid-row": "span 144" }} />

		return <>
			{clasesToday.map((c, i) => {
				const start = ((c.startHour - 6) * 12 + 1 + (c.startMinute) / 5).toString()
				const end = ((c.endHour - 6) * 12 + 1 + (c.endMinute) / 5).toString()
				return <div
					className="schedule-element tooltip"
					style={{
						"grid-column-start": (index + 2).toString(),
						"grid-row-start": start,
						"grid-row-end": end,
						"background": scheduleSections[i].color,
						"position": "relative"
					}}>
					<div className="tooltiptext" >
						<div>Course: {scheduleSections[i].courseName}</div>
						<div>Code: {scheduleSections[i].code}</div>
						<div>Teacher: {scheduleSections[i].teacher}</div>
					</div>
				</div >
			})}
		</>
	}

	return <div className="floating-container background-analogous-2">
		<div className="schedule">
			<div style={{ "grid-column-start": "1", "grid-row": "span 12" }}></div>
			{nums.map(x => <div className="schedule-numbers" style={{ "grid-column-start": "1", "grid-row": "span 12" }}>{x}</div>)}
			{
				days.map((day, dayIndex) =>
					<>
						<div
							className={"schedule-days-" + (dayIndex % 2 ? "odd" : "even")}
							style={{ "grid-column-start": (dayIndex + 2).toString(), "grid-row": "span 12" }}
						>{day}</div>
						{sectionsOfDay(dayIndex)}
					</>
				)
			}
		</div>
		<button className="button-analogous-3" onClick={copySectionsList} >Copy!</button>
	</div>
}

function App() {
	const [courses, setCourses]: [Course[], Function] = React.useState(() => [] as Course[]);
	const [generated, setGenerated]: [ScheduleSection[][], Function] = React.useState([])

	function newCourse() {
		const c: Course = { name: "", sections: [], color: "#ffffff", visible: true };
		setCourses(courses.concat([c]));
	}

	function removeCourse(course: Course) {
		const newCourses = courses.map(x => x)
		newCourses.splice(courses.findIndex((v: Course) => v === course), 1)
		setCourses(newCourses);
	}

	function generate() {
		const gen = GenerateSchedules(courses.filter(c => c.visible), [], [], 0)
		setGenerated(gen)
	}

	function exportConfiguration() {
		navigator.clipboard.writeText(JSON.stringify(courses))
	}

	function importConfiguration() {
		const courses: string = prompt("Paste the configuration json") ?? "[]"
		const coursesObject: Course[] = JSON.parse(courses)
		setCourses(coursesObject)
	}

	return <div className="main-container">
		<div className="split-30-70">
			<div className="up-down-flex background">
				<div className="up-down-flex scrollable padding-mid gap-10">
					{courses.map((c: Course) => <CourseComp courseObject={c} removeCallback={_ => removeCourse(c)} />)}
					<button onClick={newCourse} className="button-analogous-1">+</button>
				</div>
				<div>
					<button className="button-analogous-2" onClick={generate} >Generate</button>
					<button className="button-analogous-2" onClick={exportConfiguration} >Export Configuration</button>
					<button className="button-analogous-2" onClick={importConfiguration} >Import Configuration</button>
				</div>
			</div>
			<div className="generated-container">
				<div className="grid-2x2">
					{generated.map(element => <Schedule sections={element} />)}
				</div>
			</div>
		</div>
	</div>
}

export default App;
