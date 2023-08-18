import express from 'express'
import { DataResponse, InternalErrorResponse, MessageResponse, NotFoundResponse } from '../common/reponses.js'
import fileUpload from 'express-fileupload'
import { requireRole } from '../middlewares/auth.js'

import Song from '../models/Song.js'

const router = express.Router()

// Function 7: Upload music
router.post('/upload_music', requireRole('user'), fileUpload(), async (req, res) => {
    const name = req.body.name
    const musican = req.body.musican
    const music = req.files.music

    const savePath = `./public/music/${name}`
    music.mv(savePath)
    try {
        const song = await Song.create({
            name: name,
            musician: musican,
            pathSong: savePath,
            isPrivate: false,
            listenCount: 0
        })
    } catch (error) {
        res.json(MessageResponse('File music is not uploaded'))
    }
    res.json(MessageResponse('File music is uploaded'))
})

// Function 8: Download music
router.post('/download_music', async (req, res) => {
    const songID = parseInt(req.body.musicID)

    const song = await Song.findOne({
        where: {
            id: songID,
        }
    })
    console.log(song.pathSong)
    res.json(MessageResponse(`Link file music: ${song.pathSong}`))
})

// Function 9: Get all song 
router.get('/listAllSong', async (req, res) => {
    const songs = await Song.findAll()
    res.json(DataResponse(songs))
})

// Function 10: Get song by id
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    const song = await Song.findOne({
        where: {
            id: id,
        }
    })
    if (song != null) {
        const tmp = song.listenCount + 1
        await Song.update({ listenCount: tmp }, {
            where: {
                id: id,
            }
        })
        const song2 = await Song.findOne({
            where: {
                id: id,
            }
        })
        res.json(DataResponse(song2))
    } else {
        res.json(NotFoundResponse())
    }

})

// Function 11: Delete song by id
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    const result = await Song.destroy({
        where: {
            id: id,
        }
    })
    if (result === 0) {
        res.json(NotFoundResponse('Not found'))
    } else {
        res.json(MessageResponse('Song deleted'))

    }
})

// Function 12: Set privacy of song
router.put('/setPrivacy', requireRole('user'), async (req, res) => {
    const songID = parseInt(req.body.id)
    const isPrivate = req.body.isPrivate
    const song = await Song.update({ isPrivate: isPrivate }, {
        where: {
            id: songID
        }
    })
    console.log(song)
    if (song == 0) {
        res.json(NotFoundResponse('Not found'))
    } else {
        res.json(MessageResponse('Song update'))
    }
})

// Function 13: Count music plays
router.get('/:id/countNumOfTime', async (req,res) => {
    const songID = parseInt(req.params.id)
    const song = await Song.findOne({
        where: {
            id: songID,
        }
    })

    res.json(MessageResponse(`The song has ${song.listenCount} of time plays`))
})

export default router
