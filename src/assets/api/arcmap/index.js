import {
    onMounted,
    nextTick
} from "vue";
import {
    create3DMap
} from "./map"

import {dialogVisible,dialogState,setStatus} from "./marker"

import {
    epicenter,
    getdistancePlus,
    transformView,
} from "./tools"

import {
    addfault_zoneF,
    protractPath
} from "./line"


import {
    layersSettings,
    layersStyle,
    iconRenderStyle
} from "./layers"
import Editor from "@arcgis/core/widgets/Editor";
export default function useArcmap(id2d, id3d) {
    // const [map2d, view2d] = create2DMap(id2d)
    const [map3d, view3d] = create3DMap(id3d)
    onMounted(() => {
        nextTick(() => {
            // view2d.container = document.getElementById(id2d)
            view3d.container = document.getElementById(id3d)
        });
    })

    const goCenter = (view, eqCenter) => {
        view.center = [eqCenter.longitude, eqCenterlatitude]
    }
    const setconstraints = async function (view, value) {
        let tilt = view.camera.tilt + value
        if (tilt > 180 || tilt < 0) {
            return
        }
        const cam = view.camera.clone()
        cam.tilt = tilt
        view.camera = cam
    }

    const rotates = function (view, istrue) {
        // view.center = [center.longitude, center.latitude]
        // let timer = null
        if (istrue) {
            // let timer
            return new Promise((resolve, reject) => {
                let timer = null
                view.goTo({
                    target: [view.viewpoint.camera.position.longitude, view.viewpoint.camera.position.latitude],
                    heading: 0,
                    // tilt: 40
                }, {
                    duration: 2000,
                }).then(() => {
                    let heading = 0;
                    timer = setInterval(() => {
                        // console.log(heading)
                        heading += 30
                        if (heading == 360) {
                            heading = 0
                        }
                        view.goTo({
                            heading: heading,
                            // tilt: 40,
                        }, {
                            duration: 1001,
                            easing: 'linear'
                        })
                    }, 1000)
                    console.log(timer);
                    resolve(timer)
                })

            })
        } else {
            view.goTo({
                heading: 0,
                // tilt: 50
            }, {
                duration: 1000,
            })
            // clearInterval(timer)
        }
    }

    const editLabel = function (view) {
        const editor = new Editor({
            view: view
        });
        view.ui.add(editor, "bottom-left");
    }

    return {
        // map2d,
        // view2d,
        map3d,
        view3d,
        epicenter,
        goCenter,
        setconstraints,
        rotates,
        getdistancePlus,
        transformView,
        addfault_zoneF,
        protractPath,//量算曲线
        layersSettings,
        layersStyle,
        editLabel,
        iconRenderStyle,
        dialogVisible,
        dialogState,
        setStatus
    }
}
