const User = require('../models/user.model')
const userService = require('../services/user.service')

exports.getUserById = async (req, res) => {
  try {
    const response = await userService.getUserById(req.params.id)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving user.' })
  }
}

exports.enrollStudentToTeacher = async (req, res) => {
  const { teacherId, studentId } = req.body

  try {
    const teacher = await User.findById(teacherId)
    if (!teacher) {
      return res.status(404).json({ message: 'Guru tidak ditemukan' })
    }

    const student = await User.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Murid tidak ditemukan' })
    }

    teacher.students.push(studentId)
    await teacher.save()

    return res
      .status(200)
      .json({ message: 'Murid berhasil di-enroll kepada guru' })
  } catch (error) {
    console.error('Terjadi kesalahan:', error.message)
    return res.status(500).json({ message: 'Terjadi kesalahan internal' })
  }
}

exports.getStudentsByTeacher = async (req, res) => {
  const { teacherId } = req.params

  try {
    const teacher = await User.findById(teacherId).populate('students')

    if (!teacher) {
      return res.status(404).json({ message: 'Guru tidak ditemukan' })
    }

    const students = teacher.students

    return res.status(200).json({ students })
  } catch (error) {
    console.error('Terjadi kesalahan:', error.message)
    return res.status(500).json({ message: 'Terjadi kesalahan internal' })
  }
}

exports.getAllTeacher = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' })
    return res.status(200).json(teachers)
  } catch (err) {
    console.error('Terjadi kesalahan:', error.message)
    return res.status(500).json({ message: 'Terjadi kesalahan internal' })
  }
}

exports.getTeacherByEnroll = async (req, res) => {
  const studentId = req.params.studentId

  try {
    const teacher = await User.find({
      students: { $in: [studentId] },
      role: 'teacher',
    })

    if (!teacher) {
      return res
        .status(404)
        .json({ message: 'Guru tidak ditemukan untuk siswa ini.' })
    }

    // Jika ditemukan, kembalikan data guru
    return res.status(200).json(teacher)
  } catch (error) {
    console.error('Terjadi kesalahan:', error.message)
    return res.status(500).json({ message: 'Terjadi kesalahan internal' })
  }
}

exports.unenrollStudentFromTeacher = async (req, res) => {
  const { teacherId, studentId } = req.params

  try {
    const teacher = await User.findById(teacherId)
    if (!teacher) {
      return res.status(404).json({ message: 'Guru tidak ditemukan' })
    }

    const studentIndex = teacher.students.indexOf(studentId)
    if (studentIndex === -1) {
      return res
        .status(404)
        .json({ message: 'Murid tidak ditemukan di dalam daftar guru' })
    }

    teacher.students.splice(studentIndex, 1)
    await teacher.save()

    return res
      .status(200)
      .json({ message: 'Murid berhasil di-unenroll dari guru' })
  } catch (error) {
    console.error('Terjadi kesalahan:', error.message)
    return res.status(500).json({ message: 'Terjadi kesalahan internal' })
  }
}

exports.getStudentsByTeacherId = async (req, res) => {
  const { id } = req.params

  try {
    const teacher = await User.findById(id)
    if (!teacher) {
      return res.status(404).json({ message: 'Tidak ada data guru' })
    }

    const studentIds = teacher.students

    const students = await User.find({ _id: { $in: studentIds } })

    res.status(200).json(students)
  } catch (error) {
    console.error('Terjadi kesalahan:', error.message)
    return res.status(500).json({ message: 'Terjadi kesalahan internal' })
  }
}
