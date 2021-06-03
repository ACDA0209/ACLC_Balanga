'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

// const imagemin = require('imagemin');
// const imageminJpegtran = require('imagemin-jpegtran');
// const imageminPngquant = require('imagemin-pngquant');

const Helpers = use('Helpers')

class StudentFile extends Model {
    static get table () {
        return 'student_files'
    }

    static get createdAtColumn () {
        return null
    }

    static get updatedAtColumn () {
        return null
    }


    /*Setters*/
    setFile_type(file_type) {
        return  file_type.charAt(0).toLowerCase()
    }
    /*Setters*/

    static getDateTimeString() {
        var new_date = "";
        var nd = new Date();
        new_date += nd.getFullYear();
        new_date += nd.getMonth();
        new_date += nd.getDate();
        new_date += nd.getHours();
        new_date += nd.getMinutes();
        new_date += nd.getSeconds();
        new_date += nd.getMilliseconds();
        return (new_date)
    }


    static async uploadStudentFiles(student_files, student_id) {
        if (!student_files) return true;
        await student_files.moveAll(Helpers.publicPath('student_files'), (file) => {
            let randomString = Math.random().toString(20).substr(2, 6);
            let temp_screenshot = `${student_id}_${this.getDateTimeString()}_${randomString}.${file.subtype}`;
            return {
              name: temp_screenshot,
              overwrite: true
            }
          })

          const movedFiles = student_files.movedList()
          
          if (!student_files.movedAll()) {
                // await Promise.all(movedFiles.map((file) => {
                //     return removeFile(path.join(Helpers.publicPath('student_files'), file.fileName))
                // }))
                return false
            }

            await Promise.all(movedFiles.map((file) => {
                console.log(file)
               this
                .create({
                  filename: file.fileName,
                  file_type: file.subtype,
                  student_id: student_id
                })
            }))
 
        return true
    }

}

module.exports = StudentFile
