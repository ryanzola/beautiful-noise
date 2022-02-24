import * as THREE from 'three'
import Experience from './Experience';
import Background from './Background'
import Sphere from './Sphere'

export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.setBackground()
                this.setSphere()
            }
        })
    }

    setBackground() {
        this.background = new Background()
    }

    setSphere() {
        this.sphere = new Sphere()
    }

    resize()
    {
    }

    update()
    {
        if(this.background)
            this.background.update()

        if(this.sphere)
            this.sphere.update()
    }

    destroy()
    {
    }
}