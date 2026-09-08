import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

def create_document():
    doc = docx.Document()
    
    # Page Setup: US Letter (8.5 x 11 in), 0.45 in margins for balanced layout
    for section in doc.sections:
        section.top_margin = Inches(0.45)
        section.bottom_margin = Inches(0.45)
        section.left_margin = Inches(0.5)
        section.right_margin = Inches(0.5)
        section.page_width = Inches(8.5)
        section.page_height = Inches(11.0)
        section.header_distance = Inches(0.2)
        section.footer_distance = Inches(0.2)
        
    def set_font(run, name="Arial", size_pt=8.5, bold=False, italic=False, color_rgb=None):
        run.font.name = name
        run.font.size = Pt(size_pt)
        run.bold = bold
        run.italic = italic
        if color_rgb:
            run.font.color.rgb = color_rgb
        rPr = run._r.get_or_add_rPr()
        rFonts = parse_xml(f'<w:rFonts {nsdecls("w")} w:ascii="{name}" w:hAnsi="{name}" w:cs="{name}"/>')
        rPr.append(rFonts)

    def set_cell_background(cell, fill_hex):
        tcPr = cell._element.get_or_add_tcPr()
        shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
        tcPr.append(shd)

    def set_cell_margins(cell, top=45, bottom=45, left=70, right=70):
        tcPr = cell._element.get_or_add_tcPr()
        tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
        tcPr.append(tcMar)

    def set_cell_width(cell, width_in_inches):
        cell.width = Inches(width_in_inches)
        tcPr = cell._element.get_or_add_tcPr()
        w_dxa = int(width_in_inches * 1440)
        tcW = parse_xml(f'<w:tcW {nsdecls("w")} w:w="{w_dxa}" w:type="dxa"/>')
        tcPr.append(tcW)

    def set_table_borders(table, color="94A3B8", sz="4", val="single"):
        tblPr = table._element.xpath('w:tblPr')
        if tblPr:
            borders = parse_xml(
                f'<w:tblBorders {nsdecls("w")}>'
                f'<w:top w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
                f'<w:bottom w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
                f'<w:left w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
                f'<w:right w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
                f'<w:insideH w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
                f'<w:insideV w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
                f'</w:tblBorders>'
            )
            tblPr[0].append(borders)

    def cant_split_row(row):
        trPr = row._tr.get_or_add_trPr()
        trPr.append(parse_xml(f'<w:cantSplit {nsdecls("w")}/>'))

    # ==================== PAGE 1 ====================
    # Institutional Header
    p_hdr = doc.add_paragraph()
    p_hdr.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_hdr.paragraph_format.space_before = Pt(0)
    p_hdr.paragraph_format.space_after = Pt(2)
    p_hdr.paragraph_format.line_spacing = Pt(11)
    r = p_hdr.add_run("Republic of the Philippines\n")
    set_font(r, "Arial", 8.0, color_rgb=RGBColor(71, 85, 105))
    r = p_hdr.add_run("UNIVERSITY OF RIZAL SYSTEM\n")
    set_font(r, "Arial", 10.0, bold=True, color_rgb=RGBColor(15, 23, 42))
    r = p_hdr.add_run("Antipolo City Campus  •  College of Engineering")
    set_font(r, "Arial", 8.5, bold=False, color_rgb=RGBColor(71, 85, 105))

    # Document Title Block
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(3)
    p_title.paragraph_format.space_after = Pt(3)
    p_title.paragraph_format.line_spacing = Pt(12)
    r = p_title.add_run("AR-DUINO-M: AUGMENTED REALITY-DRIVEN USER INTERFACE FOR NAVIGATION AND OPERATION OF MICROCONTROLLERS\n")
    set_font(r, "Arial", 9.0, bold=True, color_rgb=RGBColor(30, 58, 138))
    r = p_title.add_run("RESEARCH-MODIFIED EVALUATION QUESTIONNAIRE")
    set_font(r, "Arial", 9.0, bold=True, color_rgb=RGBColor(15, 23, 42))

    # Brief Notice
    p_notice = doc.add_paragraph()
    p_notice.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_notice.paragraph_format.space_before = Pt(1)
    p_notice.paragraph_format.space_after = Pt(4)
    p_notice.paragraph_format.line_spacing = Pt(10.5)
    r = p_notice.add_run("Dear Respondent: Please evaluate the AR-DUINO-M application based on your hands-on experience. Your responses will be treated with strict confidentiality for thesis research purposes. Thank you for your utmost cooperation.")
    set_font(r, "Arial", 8.0, italic=True, color_rgb=RGBColor(51, 65, 85))

    # Part 1: Respondent Profile Box (Table) - 3 rows
    prof_tbl = doc.add_table(rows=3, cols=2)
    prof_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(prof_tbl, color="CBD5E1", sz="4", val="single")
    for row in prof_tbl.rows:
        cant_split_row(row)
        for cell in row.cells:
            set_cell_background(cell, "F8FAFC")
            set_cell_margins(cell, top=35, bottom=35, left=70, right=70)
            
    # Col widths: left=4.3 in, right=3.2 in (Total = 7.5 in)
    for row in prof_tbl.rows:
        set_cell_width(row.cells[0], 4.3)
        set_cell_width(row.cells[1], 3.2)

    # Row 0: Name and Date
    p = prof_tbl.rows[0].cells[0].paragraphs[0]
    p.paragraph_format.space_before = Pt(0); p.paragraph_format.space_after = Pt(0); p.paragraph_format.line_spacing = Pt(10.5)
    r = p.add_run("Name (Optional): "); set_font(r, "Arial", 8.5, bold=True)
    r = p.add_run("________________________________"); set_font(r, "Arial", 8.5)

    p = prof_tbl.rows[0].cells[1].paragraphs[0]
    p.paragraph_format.space_before = Pt(0); p.paragraph_format.space_after = Pt(0); p.paragraph_format.line_spacing = Pt(10.5)
    r = p.add_run("Date: "); set_font(r, "Arial", 8.5, bold=True)
    r = p.add_run("________________________"); set_font(r, "Arial", 8.5)

    # Row 1: Respondent Type & Device Used
    p = prof_tbl.rows[1].cells[0].paragraphs[0]
    p.paragraph_format.space_before = Pt(0); p.paragraph_format.space_after = Pt(0); p.paragraph_format.line_spacing = Pt(10.5)
    r = p.add_run("Respondent:  "); set_font(r, "Arial", 8.5, bold=True)
    r = p.add_run("[   ] Student (End-User)      [   ] Instructor / Expert"); set_font(r, "Arial", 8.5)

    p = prof_tbl.rows[1].cells[1].paragraphs[0]
    p.paragraph_format.space_before = Pt(0); p.paragraph_format.space_after = Pt(0); p.paragraph_format.line_spacing = Pt(10.5)
    r = p.add_run("Device:  "); set_font(r, "Arial", 8.5, bold=True)
    r = p.add_run("[   ] Provided      [   ] Own Device"); set_font(r, "Arial", 8.5)

    # Row 2: Program and Year Level
    p = prof_tbl.rows[2].cells[0].paragraphs[0]
    p.paragraph_format.space_before = Pt(0); p.paragraph_format.space_after = Pt(0); p.paragraph_format.line_spacing = Pt(10.5)
    r = p.add_run("Program / Course: "); set_font(r, "Arial", 8.5, bold=True)
    r = p.add_run("____________________________"); set_font(r, "Arial", 8.5)

    p = prof_tbl.rows[2].cells[1].paragraphs[0]
    p.paragraph_format.space_before = Pt(0); p.paragraph_format.space_after = Pt(0); p.paragraph_format.line_spacing = Pt(10.5)
    r = p.add_run("Year Level: "); set_font(r, "Arial", 8.5, bold=True)
    r = p.add_run("___________________"); set_font(r, "Arial", 8.5)

    # Part 2: Rating Scale Banner (Table)
    scale_tbl = doc.add_table(rows=1, cols=1)
    scale_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(scale_tbl, color="93C5FD", sz="6", val="single")
    cell = scale_tbl.rows[0].cells[0]
    set_cell_background(cell, "EFF6FF")
    set_cell_margins(cell, top=35, bottom=35, left=70, right=70)
    set_cell_width(cell, 7.5)
    cant_split_row(scale_tbl.rows[0])
    
    p = cell.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(0); p.paragraph_format.space_after = Pt(2); p.paragraph_format.line_spacing = Pt(10.5)
    r = p.add_run("EVALUATION SCALE:   "); set_font(r, "Arial", 8.5, bold=True, color_rgb=RGBColor(30, 58, 138))
    r = p.add_run("[5] Very Much Acceptable (VMA)   •   [4] Much Acceptable (MA)   •   [3] Acceptable (A)   •   [2] Less Acceptable (LA)   •   [1] Not Acceptable (NA)\n"); set_font(r, "Arial", 8.0, bold=False, color_rgb=RGBColor(15, 23, 42))
    r = p.add_run("Direction: Please place a check mark ( ✔ ) in the box corresponding to your rating for each indicator."); set_font(r, "Arial", 8.0, italic=True, color_rgb=RGBColor(71, 85, 105))

    # Spacing before main table
    p_sp = doc.add_paragraph()
    p_sp.paragraph_format.space_before = Pt(2)
    p_sp.paragraph_format.space_after = Pt(2)
    p_sp.paragraph_format.line_spacing = Pt(2)

    # PAGE 1 CRITERIA TABLE: A (Functionality), B (Reliability), C (Usability)
    table1 = doc.add_table(rows=0, cols=6)
    table1.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(table1, color="94A3B8", sz="4", val="single")

    def add_table_header(table, is_cont=False):
        row = table.add_row()
        cant_split_row(row)
        trPr = row._tr.get_or_add_trPr()
        trPr.append(parse_xml(f'<w:tblHeader {nsdecls("w")}/>'))
        
        headers = ["Criteria / Evaluation Indicators" + (" (Continued)" if is_cont else ""), "5", "4", "3", "2", "1"]
        widths = [5.0, 0.5, 0.5, 0.5, 0.5, 0.5]
        for i, (cell, h, w) in enumerate(zip(row.cells, headers, widths)):
            set_cell_background(cell, "1E3A8A")
            set_cell_width(cell, w)
            set_cell_margins(cell, top=35, bottom=35, left=60, right=60)
            p = cell.paragraphs[0]
            p.paragraph_format.space_before = Pt(0); p.paragraph_format.space_after = Pt(0); p.paragraph_format.line_spacing = Pt(10.0)
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER if i > 0 else WD_ALIGN_PARAGRAPH.LEFT
            r = p.add_run(h)
            set_font(r, "Arial", 8.5, bold=True, color_rgb=RGBColor(255, 255, 255))

    def add_section_header(table, title):
        row = table.add_row()
        cant_split_row(row)
        widths = [5.0, 0.5, 0.5, 0.5, 0.5, 0.5]
        for i, (cell, w) in enumerate(zip(row.cells, widths)):
            set_cell_background(cell, "E2E8F0")
            set_cell_width(cell, w)
            set_cell_margins(cell, top=30, bottom=30, left=60, right=60)
            p = cell.paragraphs[0]
            p.paragraph_format.space_before = Pt(0); p.paragraph_format.space_after = Pt(0); p.paragraph_format.line_spacing = Pt(10.0)
            if i == 0:
                p.alignment = WD_ALIGN_PARAGRAPH.LEFT
                r = p.add_run(title)
                set_font(r, "Arial", 8.5, bold=True, color_rgb=RGBColor(15, 23, 42))

    def add_question_row(table, num_str, question_text, bg="FFFFFF"):
        row = table.add_row()
        cant_split_row(row)
        widths = [5.0, 0.5, 0.5, 0.5, 0.5, 0.5]
        for i, (cell, w) in enumerate(zip(row.cells, widths)):
            if bg != "FFFFFF":
                set_cell_background(cell, bg)
            set_cell_width(cell, w)
            set_cell_margins(cell, top=32, bottom=32, left=60, right=60)
            p = cell.paragraphs[0]
            p.paragraph_format.space_before = Pt(0); p.paragraph_format.space_after = Pt(0); p.paragraph_format.line_spacing = Pt(10.0)
            if i == 0:
                p.alignment = WD_ALIGN_PARAGRAPH.LEFT
                r = p.add_run(f"{num_str}.  ")
                set_font(r, "Arial", 8.0, bold=True, color_rgb=RGBColor(30, 41, 59))
                r = p.add_run(question_text)
                set_font(r, "Arial", 8.0, color_rgb=RGBColor(15, 23, 42))
            else:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER

    # Build Table 1 (Page 1)
    add_table_header(table1, is_cont=False)

    # Section A: Functionality
    add_section_header(table1, "A. FUNCTIONALITY")
    func_q = [
        "The AR-DUINO-M correctly displays Arduino pin functions and components.",
        "The AR-DUINO-M performs its intended functions accurately.",
        "The AR-DUINO-M supports interaction with sensors, LEDs, and motors effectively.",
        "The AR-DUINO-M provides useful real-time feedback during operation."
    ]
    for i, q in enumerate(func_q, 1):
        add_question_row(table1, f"{i}", q)

    # Section B: Reliability
    add_section_header(table1, "B. RELIABILITY")
    rel_q = [
        "The AR tracking is stable and consistent during use.",
        "The AR-DUINO-M runs smoothly without lag or crashes.",
        "The AR-DUINO-M performs well under normal usage conditions.",
        "The AR-DUINO-M can continuously operate without unexpected errors.",
        "The AR-DUINO-M recovers properly after interruptions or errors."
    ]
    for i, q in enumerate(rel_q, 1):
        add_question_row(table1, f"{i}", q)

    # Section C: Usability
    add_section_header(table1, "C. USABILITY")
    usab_q = [
        "The AR-DUINO-M is easy to learn and use, with clear instructions and prompts for beginners.",
        "Navigation and interaction with virtual components and controls are simple and intuitive.",
        "The AR-DUINO-M minimizes confusion when performing tasks.",
        "The design, layout, and interface elements (buttons, menus, labels) are visually appealing and well-organized.",
        "The AR overlays are clear and provide an immersive, engaging AR experience."
    ]
    for i, q in enumerate(usab_q, 1):
        add_question_row(table1, f"{i}", q)

    # PAGE BREAK TO PAGE 2
    doc.add_page_break()

    # ==================== PAGE 2 ====================
    # Criteria Table Continued
    table2 = doc.add_table(rows=0, cols=6)
    table2.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(table2, color="94A3B8", sz="4", val="single")
    add_table_header(table2, is_cont=True)

    # Section D: Efficiency
    add_section_header(table2, "D. EFFICIENCY")
    eff_q = [
        "The AR-DUINO-M responds quickly to user actions.",
        "The AR-DUINO-M loads AR features within an acceptable time.",
        "Resource usage such as battery and memory consumption is efficient.",
        "The AR-DUINO-M maintains good performance during prolonged use.",
        "The AR-DUINO-M efficiently processes user inputs and outputs."
    ]
    for i, q in enumerate(eff_q, 1):
        add_question_row(table2, f"{i}", q)

    # Section E: Portability
    add_section_header(table2, "E. PORTABILITY")
    port_q = [
        "The AR-DUINO-M ran smoothly on the device I used.",
        "The AR-DUINO-M's requirements (storage, sensors, camera) are minimal and can generally be met by many Android devices.",
        "The AR-DUINO-M can be installed and used easily on supported devices.",
        "The AR-DUINO-M worked properly without requiring extra setup or configuration on my device."
    ]
    for i, q in enumerate(port_q, 1):
        add_question_row(table2, f"{i}", q)

    # Section F: Maintainability (For Instructors / Experts only)
    add_section_header(table2, "F. MAINTAINABILITY  [ For Instructors / Subject Matter Experts only ]")
    maint_q = [
        "The AR-DUINO-M design allows easy modification and improvement of features.",
        "Errors and issues in the AR-DUINO-M can be easily identified and corrected.",
        "The AR-DUINO-M structure supports future updates and enhancements.",
        "The AR-DUINO-M components are organized properly for maintenance purposes.",
        "The AR-DUINO-M can be improved without affecting overall functionality."
    ]
    for i, q in enumerate(maint_q, 1):
        add_question_row(table2, f"{i}", q)

    # Section G: Educational Effectiveness (For Students only)
    add_section_header(table2, "G. EDUCATIONAL EFFECTIVENESS  [ For Students / End-Users only ]")
    edu_q = [
        "The AR-DUINO-M improves my understanding of Arduino and microcontrollers.",
        "AR visualization helps me connect theory with actual hardware.",
        "The AR-DUINO-M application enhances my problem-solving skills.",
        "The AR-DUINO-M increases my engagement and interest in learning.",
        "The AR-DUINO-M is an effective tool for hands-on learning."
    ]
    for i, q in enumerate(edu_q, 1):
        add_question_row(table2, f"{i}", q)

    # Spacing before comments
    p_sp2 = doc.add_paragraph()
    p_sp2.paragraph_format.space_before = Pt(4)
    p_sp2.paragraph_format.space_after = Pt(2)
    p_sp2.paragraph_format.line_spacing = Pt(2)

    # Comments and Suggestions Box
    comm_tbl = doc.add_table(rows=1, cols=1)
    comm_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(comm_tbl, color="94A3B8", sz="4", val="single")
    cell = comm_tbl.rows[0].cells[0]
    set_cell_background(cell, "F8FAFC")
    set_cell_margins(cell, top=40, bottom=40, left=70, right=70)
    set_cell_width(cell, 7.5)
    cant_split_row(comm_tbl.rows[0])

    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(0); p.paragraph_format.space_after = Pt(3); p.paragraph_format.line_spacing = Pt(10.5)
    r = p.add_run("Comments / Suggestions / Recommendations for Improvement:\n")
    set_font(r, "Arial", 8.5, bold=True, color_rgb=RGBColor(30, 58, 138))
    
    # 4 dotted response lines with good line height for handwriting
    for _ in range(4):
        p_line = cell.add_paragraph()
        p_line.paragraph_format.space_before = Pt(0); p_line.paragraph_format.space_after = Pt(2); p_line.paragraph_format.line_spacing = Pt(13)
        r = p_line.add_run("." * 140)
        set_font(r, "Arial", 7.0, color_rgb=RGBColor(203, 213, 225))

    # Bottom Thank You note
    p_foot = doc.add_paragraph()
    p_foot.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_foot.paragraph_format.space_before = Pt(4)
    p_foot.paragraph_format.space_after = Pt(0)
    p_foot.paragraph_format.line_spacing = Pt(9.5)
    r = p_foot.add_run("Thank you for your valuable time and participation in our thesis research!")
    set_font(r, "Arial", 8.0, italic=True, bold=True, color_rgb=RGBColor(71, 85, 105))

    output_filename = "Questionnaires-Revision FOR ANSWERING (2-Page Compressed).docx"
    doc.save(output_filename)
    print(f"Document successfully updated and saved to: {output_filename}")

if __name__ == "__main__":
    create_document()
