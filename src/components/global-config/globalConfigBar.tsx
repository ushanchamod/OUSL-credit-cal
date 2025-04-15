import { useEffect } from 'react'
import { useStore } from '../../store/global'
import { applyFilter } from '../../utility/dataClean'
import MultipleSelectChip from '../ui/MultipleSelectChip'
import BasicSelect from '../ui/BasicSelect'

const GlobalConfigBar = () => {
    const config = useStore(state => state.config)
    const upload = useStore(state => state.upload)
    const setConfig = useStore(state => state.setConfig)
    const populateData = useStore(state => state.populateData)


    useEffect(() => {
        if (upload) {
            const x = applyFilter(upload, config)
            populateData(x)
        }
    }, [
        config.removePending,
        config.removeRepeat,
        config.removeResit,
        config.level,
        config.credit,
        config.category,
        config.progress,
        config.loy,
        config.compulsoryState,
        upload,

    ])

    const setLevels = (levels: string[]) => {
        const toNum = levels.map(num => parseInt(num))
        setConfig({
            ...config,
            level: toNum
        })
    }

    const setCredits = (credits: string[]) => {
        const toNum = credits.map(num => parseInt(num))
        setConfig({
            ...config,
            credit: toNum
        })
    }

    const setCategory = (category: string[]) => {
        setConfig({
            ...config,
            category: category
        })
    }

    const setProgress = (progress: string[]) => {
        setConfig({
            ...config,
            progress: progress
        })
    }

    const setLoy = (loy: string[]) => {
        setConfig({
            ...config,
            loy: loy.map(num => parseInt(num))
        })
    }

    const setCompulsoryState = (state: 'both' | 'compulsory' | 'notCompulsory') => {
        setConfig({
            ...config,
            compulsoryState: state
        })
    }


    const clearFilters = () => {
        setConfig({
            removePending: false,
            removeRepeat: false,
            removeResit: false,
            credit: [],
            level: [],
            lof: [],
            category: [],
            progress: [],
            loy: [],
            compulsoryState: 'both',
        })
    }

    return (
        <div className="w-full p-4 bg-white shadow-md rounded-[5px] space-y-6 border-1 border-gray-200 box-border mt-5">


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <MultipleSelectChip
                    label='Levels'
                    setStateName={setLevels}
                    state={
                        upload
                            ? [...new Set(upload.map(d => d.level.toString()))]
                            : []
                    }
                    stateName={config.level.map(i => i.toLocaleString())}
                />

                <MultipleSelectChip
                    label='Credit'
                    setStateName={setCredits}
                    state={
                        upload
                            ? [...new Set(upload.map(d => d.credit.toString()))]
                            : []
                    }
                    stateName={config.credit.map(i => i.toLocaleString())}
                />

                <MultipleSelectChip
                    label='Category'
                    setStateName={setCategory}
                    state={
                        upload
                            ? [...new Set(upload.map(d => d.category))]
                            : []
                    }
                    stateName={config.category.map(i => i.toLocaleString())}
                />

                <MultipleSelectChip
                    label='Progress'
                    setStateName={setProgress}
                    state={
                        upload
                            ? [...new Set(upload.map(d => d.progress))]
                            : []
                    }
                    stateName={config.progress.map(i => i.toLocaleString())}
                />

                <MultipleSelectChip
                    label='Last Offer Year'
                    setStateName={setLoy}
                    state={
                        upload
                            ? [...new Set(upload.map(d => d.loy.toString()))]
                            : []
                    }
                    stateName={config.loy.map(i => i.toString())}
                />

                <BasicSelect
                    options={[
                        { label: 'All Subject', value: 'both' },
                        { label: 'Compulsory', value: 'compulsory' },
                        { label: 'Optional', value: 'notCompulsory' }
                    ]}
                    label='Obligated'
                    value={config.compulsoryState}
                    setValue={(value) => setCompulsoryState(value as 'both' | 'compulsory' | 'notCompulsory')}
                />

                <button
                    className="bg-[#D06718] mt-2 rounded-[4px] w-fit px-5 py-2 text-white shadow-md hover:bg-[#b65714] transition duration-300 cursor-pointer"
                    onClick={clearFilters}
                >
                    Clear Filters
                </button>

            </div>
        </div>
    )
}

export default GlobalConfigBar
