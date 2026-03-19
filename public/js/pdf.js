function loadImageAsBase64(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext("2d").drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/png"));
        };
        img.onerror = reject;
        img.src = src;
    });
}

async function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const today = new Date().toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 14;

    const C = {
        bg: [15, 15, 15],
        surface: [24, 24, 24],
        muted: [100, 100, 100],
        text: [240, 240, 240],
        cal: [255, 209, 102],
        prot: [200, 240, 96],
        carb: [116, 185, 255],
        fat: [253, 121, 168],
        fib: [162, 155, 254],
        border: [42, 42, 42],
    };

    // ── Fondo completo
    doc.setFillColor(...C.bg);
    doc.rect(0, 0, 210, 297, "F");

    // ── Header
    doc.setFillColor(...C.surface);
    doc.rect(0, 0, 210, 28, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(...C.text);
    doc.text("CALCULADORA DE DIETA", margin, 12);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...C.muted);
    doc.text(today, margin, 19);

    // ── Tarjetas de totales
    const total = calcTotal();
    const macroLabels = ["Calorías", "Proteína", "Carbs", "Grasas", "Fibra"];
    const macroUnits = ["kcal", "g", "g", "g", "g"];
    const macroColors = [C.cal, C.prot, C.carb, C.fat, C.fib];

    const cardW = (pageW - margin * 2 - 4 * 3) / 5;
    const cardY = 32;
    const cardH = 18;

    total.forEach((val, i) => {
        const x = margin + i * (cardW + 3);

        doc.setFillColor(...C.surface);
        doc.roundedRect(x, cardY, cardW, cardH, 2, 2, "F");

        doc.setFillColor(...macroColors[i]);
        doc.rect(x, cardY + cardH - 1.5, cardW, 1.5, "F");

        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.5);
        doc.setTextColor(...C.muted);
        doc.text(macroLabels[i].toUpperCase(), x + cardW / 2, cardY + 5, { align: "center" });

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(...macroColors[i]);
        doc.text(String(val), x + cardW / 2, cardY + 11.5, { align: "center" });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(6);
        doc.setTextColor(...C.muted);
        doc.text(macroUnits[i], x + cardW / 2, cardY + 15.5, { align: "center" });
    });

    // ── Tabla de desglose por comida
    let curY = cardY + cardH + 8;

    for (const meal of MEALS) {
        const validRows = state[meal.id].filter(r => r.food && DB[r.food] && parseFloat(r.grams) > 0);
        if (!validRows.length) continue;

        // Encabezado de comida
        doc.setFillColor(...C.surface);
        doc.rect(margin, curY, pageW - margin * 2, 7, "F");
        doc.setDrawColor(...C.border);
        doc.rect(margin, curY, pageW - margin * 2, 7, "S");

        // Icono: imagen o emoji
        const isImage = meal.icon.includes('.');
        if (isImage) {
            try {
                const b64 = await loadImageAsBase64(meal.icon);
                doc.addImage(b64, 'PNG', margin + 2, curY + 1, 5, 5);
                doc.setFont("helvetica", "bold");
                doc.setFontSize(7.5);
                doc.setTextColor(...C.text);
                doc.text(meal.label.toUpperCase(), margin + 9, curY + 4.8);
            } catch {
                // si la imagen falla, solo muestra el texto
                doc.setFont("helvetica", "bold");
                doc.setFontSize(7.5);
                doc.setTextColor(...C.text);
                doc.text(meal.label.toUpperCase(), margin + 3, curY + 4.8);
            }
        } else {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(7.5);
            doc.setTextColor(...C.text);
            doc.text(meal.label.toUpperCase(), margin + 3, curY + 4.8);
        }

        // Macros del tiempo en lado derecho
        const mTotals = calcMeal(meal.id);
        const mStr = `${mTotals[0]} kcal  |  P: ${mTotals[1]}g  C: ${mTotals[2]}g  G: ${mTotals[3]}g  F: ${mTotals[4]}g`;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.5);
        doc.setTextColor(...C.muted);
        doc.text(mStr, pageW - margin - 3, curY + 4.8, { align: "right" });

        curY += 7;

        // Filas de alimentos
        const tableRows = validRows.map(r => {
            const v = calcRow(r.food, r.grams);
            return [r.food, `${r.grams}g`, v[0], v[1], v[2], v[3], v[4]];
        });

        doc.autoTable({
            startY: curY,
            margin: { left: margin, right: margin },
            head: [["Alimento", "Gramos", "kcal", "Prot", "Carb", "Gras", "Fib"]],
            body: tableRows,
            theme: "plain",
            styles: {
                font: "helvetica",
                fontSize: 7.5,
                textColor: C.text,
                cellPadding: { top: 2, bottom: 2, left: 3, right: 3 },
                fillColor: C.bg,
                lineColor: C.border,
                lineWidth: 0.2,
            },
            headStyles: {
                fillColor: [20, 20, 20],
                textColor: C.muted,
                fontSize: 6.5,
                fontStyle: "normal",
            },
            columnStyles: {
                0: { cellWidth: "auto" },
                1: { cellWidth: 18, halign: "right", textColor: C.text },
                2: { cellWidth: 16, halign: "right", textColor: C.cal },
                3: { cellWidth: 16, halign: "right", textColor: C.prot },
                4: { cellWidth: 16, halign: "right", textColor: C.carb },
                5: { cellWidth: 16, halign: "right", textColor: C.fat },
                6: { cellWidth: 16, halign: "right", textColor: C.fib },
            },
            alternateRowStyles: { fillColor: [18, 18, 18] },
            didParseCell(data) {
                if (data.section === "body") {
                    data.cell.styles.lineColor = C.border;
                }
            },
        });

        curY = doc.lastAutoTable.finalY + 5;
    }

    // ── Fila TOTAL final
    const colW = [0, 18, 16, 16, 16, 16, 16];
    const usableW = pageW - margin * 2;
    const firstColW = usableW - colW.slice(1).reduce((a, b) => a + b, 0);

    doc.setFillColor(...C.surface);
    doc.rect(margin, curY, usableW, 8, "F");
    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.4);
    doc.line(margin, curY, margin + usableW, curY);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...C.text);
    doc.text("TOTAL DEL DÍA", margin + 3, curY + 5.3);

    const colColors = [C.cal, C.prot, C.carb, C.fat, C.fib];
    let cx = margin + firstColW + colW[1];
    total.forEach((val, i) => {
        doc.setTextColor(...colColors[i]);
        doc.text(String(val), cx - 3, curY + 5.3, { align: "right" });
        cx += colW[i + 2];
    });

    // ── Footer
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    doc.setTextColor(...C.muted);
    doc.text("// generado con calculadora-dieta.html", margin, 292);

    doc.save(`dieta-${new Date().toISOString().slice(0, 10)}.pdf`);
}