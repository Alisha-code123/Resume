
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { dummyResumeData } from '../assets'
import {
  ArrowLeft,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User
} from 'lucide-react'

import PersonalInform from '../componets/PersonalInform'
import ResumePreview from '../componets/ResumePreview'
import TemplateSelctor from '../componets/TemplateSelctor'
import Colorpicor from '../componets/Colorpicor'
import ProfessionalSummeri from '../componets/ProfessionalSummeri'
import ExperienceForm from '../componets/ExperienceForm'
import EducationForm from '../componets/EducationForm'
import ProjectForm from '../componets/ProjectForm'
import SkillForms from '../componets/SkillForms'

const ResumeBuilder = () => {
  const { resumeId } = useParams()

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: 'classic',
    accent_color: '#3B82F6',
    public: false
  })

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'summary', name: 'Summary', icon: FileText },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'projects', name: 'Projects', icon: FolderIcon },
    { id: 'skills', name: 'Skills', icon: Sparkles }
  ]

  const activeSection = sections[activeSectionIndex]

  useEffect(() => {
    const resume = dummyResumeData.find(r => r._id === resumeId)
    if (resume) {
      setResumeData(resume)
      document.title = resume.title
    }
  }, [resumeId])

  const changeResumevisibility = () => {
    setResumeData(prev => ({ ...prev, public: !prev.public }))
  }

  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app/')[0]
    const resumeUrl = frontendUrl + '/view/' + resumeId

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: 'My Resume' })
    } else {
      alert('Share not supported on this browser.')
    }
  }

  const downloadResume = () => {
    window.print()
  }

  return (
    <div>
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/app"
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="size-4" /> Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT PANEL */}
          <div className="lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">

              {/* Progress bar */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-300"
                style={{
                  width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`
                }}
              />

              {/* Navigation */}
              <div className="flex justify-between items-center mb-6 border-b py-2">
                <div className="flex items-center gap-2">
                  <TemplateSelctor
                    selectedTemplate={resumeData.template}
                    onChange={template =>
                      setResumeData(prev => ({ ...prev, template }))
                    }
                  />
                  <Colorpicor
                    selectedColor={resumeData.accent_color}
                    onChange={color =>
                      setResumeData(prev => ({ ...prev, accent_color: color }))
                    }
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={activeSectionIndex === 0}
                    onClick={() =>
                      setActiveSectionIndex(i => Math.max(i - 1, 0))
                    }
                    className="flex items-center gap-1 px-3 py-2 text-sm rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronLeft className="size-4" /> Prev
                  </button>

                  <button
                    disabled={activeSectionIndex === sections.length - 1}
                    onClick={() =>
                      setActiveSectionIndex(i =>
                        Math.min(i + 1, sections.length - 1)
                      )
                    }
                    className="flex items-center gap-1 px-3 py-2 text-sm rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* Forms */}
              <div className="space-y-6">
                {activeSection.id === 'personal' && (
                  <PersonalInform
                    data={resumeData.personal_info}
                    onChange={data =>
                      setResumeData(prev => ({
                        ...prev,
                        personal_info: data
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {activeSection.id === 'summary' && (
                  <ProfessionalSummeri
                    data={resumeData.professional_summary}
                    onChange={data =>
                      setResumeData(prev => ({
                        ...prev,
                        professional_summary: data
                      }))
                    }
                  />
                )}

                {activeSection.id === 'experience' && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={data =>
                      setResumeData(prev => ({ ...prev, experience: data }))
                    }
                  />
                )}

                {activeSection.id === 'education' && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={data =>
                      setResumeData(prev => ({ ...prev, education: data }))
                    }
                  />
                )}

                {activeSection.id === 'projects' && (
                  <ProjectForm
                    data={resumeData.project}
                    onChange={data =>
                      setResumeData(prev => ({ ...prev, project: data }))
                    }
                  />
                )}

                {activeSection.id === 'skills' && (
                  <SkillForms
                    data={resumeData.skills}
                    onChange={data =>
                      setResumeData(prev => ({ ...prev, skills: data }))
                    }
                  />
                )}
              </div>

              <button className="mt-6 px-6 py-2 text-sm rounded-md bg-green-100 text-green-600 ring-1 ring-green-300 hover:ring-green-400">
                Save Changes
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-7 space-y-4">

            {/* TOP ACTION BAR */}
            <div className="flex justify-end gap-2 bg-white p-3 rounded-lg border shadow-sm">
              {resumeData.public && (
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 text-xs rounded bg-blue-100 hover:ring"
                >
                  <Share2Icon className="size-4" /> Share
                </button>
              )}

              <button
                onClick={changeResumevisibility}
                className="flex items-center gap-2 px-4 py-2 text-xs rounded bg-blue-100 hover:ring"
              >
                {resumeData.public ? (
                  <EyeIcon className="size-4" />
                ) : (
                  <EyeOffIcon className="size-4" />
                )}
                {resumeData.public ? 'Public' : 'Private'}
              </button>

              <button
                onClick={downloadResume}
                className="flex items-center gap-2 px-4 py-2 text-xs rounded bg-blue-100 hover:ring"
              >
                <DownloadIcon className="size-4" /> Download
              </button>
            </div>

            {/* RESUME PREVIEW */}
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder
