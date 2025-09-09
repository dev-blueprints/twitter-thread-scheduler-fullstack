# app/services/template_service.py
from sqlalchemy.orm import Session
from app.models.template import Template
from app.schemas.template import TemplateCreate

class TemplateService:
    @staticmethod
    def get_default_templates():
        """Return default finance templates"""
        return [
            {
                "name": "Stock Analysis",
                "description": "Comprehensive stock analysis template",
                "category": "stock_analysis",
                "structure": [
                    {
                        "type": "intro",
                        "content": "🧵 Thread: Deep dive into ${SYMBOL} \n\nLet me break down why this stock caught my attention:",
                        "placeholders": ["SYMBOL"]
                    },
                    {
                        "type": "metrics",
                        "content": "📊 Key Metrics:\n• Price: ${PRICE}\n• Market Cap: ${MARKET_CAP}\n• P/E Ratio: ${PE_RATIO}\n• Volume: ${VOLUME}",
                        "placeholders": ["PRICE", "MARKET_CAP", "PE_RATIO", "VOLUME"]
                    },
                    {
                        "type": "analysis",
                        "content": "💡 My Analysis:\n${ANALYSIS_CONTENT}",
                        "placeholders": ["ANALYSIS_CONTENT"]
                    },
                    {
                        "type": "disclaimer",
                        "content": "⚠️ This is not financial advice. Always do your own research. I may hold positions in mentioned securities.",
                        "placeholders": []
                    }
                ],
                "compliance_disclaimers": [
                    "This is not financial advice. Always do your own research.",
                    "I may hold positions in mentioned securities."
                ]
            },
            {
                "name": "Market Commentary",
                "description": "Daily market overview template",
                "category": "market_commentary",
                "structure": [
                    {
                        "type": "intro",
                        "content": "🌅 Morning Market Update - ${DATE}\n\nHere's what's moving markets today:",
                        "placeholders": ["DATE"]
                    },
                    {
                        "type": "indices",
                        "content": "📈 Major Indices:\n• S&P 500: ${SPY_DATA}\n• NASDAQ: ${QQQ_DATA}\n• Dow Jones: ${DIA_DATA}",
                        "placeholders": ["SPY_DATA", "QQQ_DATA", "DIA_DATA"]
                    },
                    {
                        "type": "movers",
                        "content": "🔥 Top Movers:\n${TOP_MOVERS}",
                        "placeholders": ["TOP_MOVERS"]
                    },
                    {
                        "type": "outlook",
                        "content": "🔮 What to Watch:\n${OUTLOOK}",
                        "placeholders": ["OUTLOOK"]
                    }
                ],
                "compliance_disclaimers": [
                    "Market commentary for educational purposes only.",
                    "Not personalized investment advice."
                ]
            }
        ]

    @staticmethod
    def create_default_templates(db: Session):
        """Create default templates in database"""
        templates = TemplateService.get_default_templates()
        
        for template_data in templates:
            existing = db.query(Template).filter(Template.name == template_data["name"]).first()
            if not existing:
                template = Template(**template_data)
                db.add(template)
        
        db.commit()