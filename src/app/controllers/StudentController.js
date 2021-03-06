import { Student } from '../models'

import message from '../utils/message'
import { students as studentsErrors } from '../messages/errors'
import { students as studentsSuccess } from '../messages/success'

class StudentController {
	async index(req, res) {
		const students = await Student.findAll({
			where: { user_id: req.userId },
			attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
			order: [['created_at', 'DESC']],
		})

		if (!students) {
			return res.status(404).json(message(studentsErrors.notFoundIndex))
		}

		return res.status(200).json(students)
	}

	async show(req, res) {
		const { id } = req.params

		const student = await Student.findOne({
			where: {
				id,
				user_id: req.userId,
			},
			attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
		})

		if (!student) {
			return res.status(404).json(message(studentsErrors.notFound))
		}

		return res.status(200).json(student)
	}

	async store(req, res) {
		const student = await Student.findOne({
			where: { email: req.body.email, user_id: req.userId },
		})

		if (student) {
			return res
				.status(404)
				.json(message(studentsErrors.alreadyExists, 'email'))
		}

		const { id, name, email, age, height, weight } = await Student.create({
			...req.body,
			user_id: req.userId,
		})

		return res.status(201).json({ id, name, email, age, height, weight })
	}

	async update(req, res) {
		const studentById = await Student.findOne({
			where: {
				id: req.params.id,
				user_id: req.userId,
			},
		})

		if (!studentById) {
			return res.status(404).json(message(studentsErrors.notFound))
		}

		const studentByEmail = await Student.findOne({
			where: {
				email: req.body.email,
				user_id: req.userId,
			},
		})

		if (studentByEmail && studentById.email !== studentByEmail.email) {
			return res
				.status(404)
				.json(message(studentsErrors.alreadyExists, 'email'))
		}

		const { id, name, email, age, height, weight } = await studentById.update(
			req.body,
			{
				where: {
					id: req.params.id,
					user_id: req.userId,
				},
			}
		)

		return res.status(200).json({ id, name, email, age, height, weight })
	}

	async destroy(req, res) {
		const student = await Student.findOne({
			where: {
				id: req.params.id,
				user_id: req.userId,
			},
		})

		if (!student) {
			return res.status(404).json(message(studentsErrors.notFound))
		}

		await student.destroy()
		return res.status(200).json({ success: studentsSuccess.deleted })
	}
}

export default new StudentController()
