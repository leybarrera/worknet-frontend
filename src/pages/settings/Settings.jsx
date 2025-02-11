import { useState } from 'react'
import ProfileTab from '../../components/tabs/ProfileTab'
import CurriculumTab from '../../components/tabs/CurriculumTab'
import SkillsTab from '../../components/tabs/SkillsTab'
import EducationTab from '../../components/tabs/EducationTab'
import WorkExperienceTab from '../../components/tabs/WorkExperience'
import ReferencesTab from '../../components/tabs/ReferencesTab'

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState('general')

  const handleTab = (tab) => setSelectedTab(tab)

  return (
    <main className="w-full mx-auto flex flex-col">
      <h2 className="text-3xl font-bold text-[#00B4B7] mb-5">Configuración</h2>
      {/* Menú */}
      <nav className="border-b border-gray-200 flex flex-row mb-5">
        <button
          className={`pr-10 py-5 border-b-2 font-bold ${
            selectedTab === 'general'
              ? 'text-[#00B4B7] border-[#00B4B7]'
              : 'text-[#78838B] border-b-transparent'
          }`}
          onClick={() => handleTab('general')}
        >
          Información general
        </button>
        <button
          className={`pr-10 py-5 border-b-2 font-bold ${
            selectedTab === 'cv'
              ? 'text-[#00B4B7] border-[#00B4B7]'
              : 'text-[#78838B] border-b-transparent'
          }`}
          onClick={() => handleTab('cv')}
        >
          Currículum
        </button>
        <button
          className={`pr-10 py-5 border-b-2 font-bold ${
            selectedTab === 'habilidades'
              ? 'text-[#00B4B7] border-[#00B4B7]'
              : 'text-[#78838B] border-b-transparent'
          }`}
          onClick={() => handleTab('habilidades')}
        >
          Habilidades
        </button>
        <button
          className={`pr-10 py-5 border-b-2 font-bold ${
            selectedTab === 'educacion'
              ? 'text-[#00B4B7] border-[#00B4B7]'
              : 'text-[#78838B] border-b-transparent'
          }`}
          onClick={() => handleTab('educacion')}
        >
          Educación
        </button>
        <button
          className={`pr-10 py-5 border-b-2 font-bold ${
            selectedTab === 'experiencia'
              ? 'text-[#00B4B7] border-[#00B4B7]'
              : 'text-[#78838B] border-b-transparent'
          }`}
          onClick={() => handleTab('experiencia')}
        >
          Experiencia laboral
        </button>

        <button
          className={`pr-10 py-5 border-b-2 font-bold ${
            selectedTab === 'referencia'
              ? 'text-[#00B4B7] border-[#00B4B7]'
              : 'text-[#78838B] border-b-transparent'
          }`}
          onClick={() => handleTab('referencia')}
        >
          Referencias
        </button>
      </nav>

      {selectedTab === 'general' && <ProfileTab />}
      {selectedTab === 'cv' && <CurriculumTab />}
      {selectedTab === 'habilidades' && <SkillsTab />}
      {selectedTab === 'educacion' && <EducationTab />}
      {selectedTab === 'experiencia' && <WorkExperienceTab />}
      {selectedTab === 'referencia' && <ReferencesTab />}
    </main>
  )
}

export default Settings
