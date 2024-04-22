# -*- coding: utf-8 -*-
# Resume Related API Endpoints
from __future__ import annotations

import logging

from fastapi import APIRouter, File, HTTPException, UploadFile

from helpers.utility import Utility
from constant import Message
from services.process_resume import process_resume, analyse_resume, extract_resume
from models.resume import ResumeAnalysis, ResumeInfo, CandidateExperience
import json

MODULE_NAME = "Resume Processing"

router = APIRouter(prefix="/api/aceresume/resume", tags=[MODULE_NAME])

logger = logging.getLogger(MODULE_NAME)


@router.post(
    "/{user_id}/upload",
    status_code=200,
    description="Upload resume for processing",
    response_model=ResumeInfo,
    response_description="Message to show whether the resume is uploaded successfully or not",
    responses={401: {"model": Message}, 500: {"model": Message}},
)
@Utility.measure_runtime
async def upload_resume(
    resume: UploadFile = File(..., description="Resume file to upload"),
    filename: str = File(..., description="Filename of the resume"),
):
    if filename.split(".")[-1] not in ["docx", "pdf"]:
        raise HTTPException(
            status_code=401,
            detail="Only docx and pdf files are supported",
        )

    resume_data = await process_resume(
        resume.file.read(), resume.filename.split(".")[-1]
    )

    # TODO: Save the resume data to the database
    data = await extract_resume(resume_data)

    return ResumeInfo(
        candidate_name=str(data["candidate_name"]),
        candidate_email=str(data["candidate_email"]),
        candidate_skill=data["skills"],
        candidate_experience=[
            CandidateExperience(
                company_name=str(value["work_company"]),
                job_title=str(value["work_title"]),
                start_date=str(value["work_timeline"][0]),
                end_date=str(value["work_timeline"][1]),
                job_description="\n".join(value["work_responsibilities"]),
            )
            for value in data["work_exp"]
        ],
    )


@router.post(
    "/{user_id}/analyse",
    status_code=200,
    description="Analyse the Resume Info",
    response_model=ResumeAnalysis,
    response_description="Message to show whether the resume is analysed successfully or not",
    responses={401: {"model": Message}, 500: {"model": Message}},
)
async def feedback_resume(
    user_id: str,
    resume_info: str,
) -> ResumeAnalysis:
    analysis_result = await analyse_resume(resume_info)
    json_result = json.loads(analysis_result[8:].strip().replace("`", ""))

    return ResumeAnalysis(
        pros=json_result["pros"],
        cons=json_result["cons"],
        add_ons=json_result["add-ons"],
    )